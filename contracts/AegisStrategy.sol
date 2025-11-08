// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PublicGoodsScorer.sol";

/**
 * @title AegisStrategy
 * @dev Multi-chain yield strategy that optimizes for public good impact
 * @notice This strategy automatically selects the best protocol based on weighted APY (APY * PGS)
 */
contract AegisStrategy is Ownable {
    using SafeERC20 for IERC20;
    
    PublicGoodsScorer public immutable scorer;
    
    struct ProtocolInfo {
        string name;
        address protocolAddress;
        uint256 chainId;
        uint256 currentAPY; // in basis points
        uint256 weightedAPY; // in basis points
        bool isActive;
    }
    
    struct Position {
        string protocolName;
        uint256 amount;
        uint256 lastDeposit;
        uint256 lastHarvest;
    }
    
    // Supported tokens
    IERC20 public immutable asset;
    
    // Current position
    Position public currentPosition;
    
    // Supported protocols
    mapping(string => ProtocolInfo) public supportedProtocols;
    string[] public protocolNames;
    
    // Multi-chain bridge interface (simplified)
    address public bridgeRouter;
    
    // Configuration
    uint256 public minRebalanceThreshold = 100; // 1% difference in basis points
    uint256 public harvestCooldown = 1 hours;
    
    // Events
    event StrategyRebalanced(string oldProtocol, string newProtocol, uint256 amount);
    event FundsDeployed(string protocol, uint256 amount);
    event FundsWithdrawn(string protocol, uint256 amount);
    event Harvested(uint256 amount);
    event BridgeRouterUpdated(address newRouter);
    
    // Modifiers
    modifier onlyValidProtocol(string memory _protocolName) {
        require(supportedProtocols[_protocolName].isActive, "Protocol not supported");
        _;
    }
    
    modifier onlyWhenNotRebalancing() {
        require(currentPosition.amount == 0 || block.timestamp >= currentPosition.lastHarvest + harvestCooldown, "Rebalancing in cooldown");
        _;
    }
    
    constructor(
        address _asset,
        address _scorer,
        address _bridgeRouter
    ) {
        require(_asset != address(0), "Invalid asset address");
        require(_scorer != address(0), "Invalid scorer address");
        require(_bridgeRouter != address(0), "Invalid bridge router");
        
        asset = IERC20(_asset);
        scorer = PublicGoodsScorer(_scorer);
        bridgeRouter = _bridgeRouter;
        
        _initializeSupportedProtocols();
    }
    
    /**
     * @dev Deploy funds to the optimal protocol
     */
    function deployFunds(uint256 _amount) external onlyOwner onlyWhenNotRebalancing {
        require(_amount > 0, "Amount must be greater than 0");
        require(asset.balanceOf(address(this)) >= _amount, "Insufficient balance");
        
        string memory bestProtocol = _findBestProtocol();
        uint256 currentChainId = block.chainid;
        
        // If we have an existing position, withdraw first
        if (currentPosition.amount > 0) {
            _withdrawFromProtocol(currentPosition.protocolName, currentPosition.amount);
        }
        
        // Check if we need to bridge to another chain
        ProtocolInfo memory protocolInfo = supportedProtocols[bestProtocol];
        
        if (protocolInfo.chainId != currentChainId) {
            // Bridge funds to target chain (simplified implementation)
            _bridgeFunds(bestProtocol, _amount, protocolInfo.chainId);
        }
        
        // Deploy to the selected protocol
        _deployToProtocol(bestProtocol, _amount);
        
        // Update current position
        currentPosition = Position({
            protocolName: bestProtocol,
            amount: _amount,
            lastDeposit: block.timestamp,
            lastHarvest: block.timestamp
        });
        
        emit FundsDeployed(bestProtocol, _amount);
    }
    
    /**
     * @dev Withdraw all funds from current position
     */
    function withdrawAllFunds() external onlyOwner {
        require(currentPosition.amount > 0, "No active position");
        
        _withdrawFromProtocol(currentPosition.protocolName, currentPosition.amount);
        
        emit FundsWithdrawn(currentPosition.protocolName, currentPosition.amount);
        
        // Clear current position
        currentPosition = Position({
            protocolName: "",
            amount: 0,
            lastDeposit: 0,
            lastHarvest: 0
        });
    }
    
    /**
     * @dev Harvest yield and rebalance if necessary
     */
    function harvestAndReport() external onlyOwner returns (uint256 totalAssets) {
        require(currentPosition.amount > 0, "No active position");
        
        // Harvest yield from current protocol
        uint256 yield = _harvestFromProtocol(currentPosition.protocolName);
        
        if (yield > 0) {
            emit Harvested(yield);
        }
        
        // Check if we should rebalance
        string memory bestProtocol = _findBestProtocol();
        uint256 currentWeightedAPY = supportedProtocols[currentPosition.protocolName].weightedAPY;
        uint256 bestWeightedAPY = supportedProtocols[bestProtocol].weightedAPY;
        
        if (bestWeightedAPY > currentWeightedAPY + minRebalanceThreshold) {
            _rebalanceToProtocol(bestProtocol);
        }
        
        // Get total assets (principal + yield)
        totalAssets = _getTotalAssets();
        
        currentPosition.lastHarvest = block.timestamp;
    }
    
    /**
     * @dev Get total assets in the strategy
     */
    function getTotalAssets() external view returns (uint256) {
        return _getTotalAssets();
    }
    
    /**
     * @dev Get current position info
     */
    function getCurrentPosition() external view returns (Position memory) {
        return currentPosition;
    }
    
    /**
     * @dev Get all supported protocols
     */
    function getSupportedProtocols() external view returns (ProtocolInfo[] memory) {
        uint256 activeCount = 0;
        
        for (uint256 i = 0; i < protocolNames.length; i++) {
            if (supportedProtocols[protocolNames[i]].isActive) {
                activeCount++;
            }
        }
        
        ProtocolInfo[] memory activeProtocols = new ProtocolInfo[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < protocolNames.length; i++) {
            if (supportedProtocols[protocolNames[i]].isActive) {
                activeProtocols[index] = supportedProtocols[protocolNames[i]];
                index++;
            }
        }
        
        return activeProtocols;
    }
    
    /**
     * @dev Update bridge router address
     */
    function updateBridgeRouter(address _newRouter) external onlyOwner {
        require(_newRouter != address(0), "Invalid router address");
        bridgeRouter = _newRouter;
        emit BridgeRouterUpdated(_newRouter);
    }
    
    /**
     * @dev Update APY for a protocol (would be called by oracle or keeper)
     */
    function updateProtocolAPY(string memory _protocolName, uint256 _newAPY) external onlyOwner {
        require(supportedProtocols[_protocolName].isActive, "Protocol not supported");
        
        supportedProtocols[_protocolName].currentAPY = _newAPY;
        
        // Recalculate weighted APY
        uint256 pgs = scorer.getPGS(_protocolName);
        supportedProtocols[_protocolName].weightedAPY = (_newAPY * pgs) / 100;
    }
    
    /**
     * @dev Internal: Find the best protocol based on weighted APY
     */
    function _findBestProtocol() internal view returns (string memory) {
        uint256 bestWeightedAPY = 0;
        string memory bestProtocol = protocolNames[0];
        
        for (uint256 i = 0; i < protocolNames.length; i++) {
            ProtocolInfo memory protocol = supportedProtocols[protocolNames[i]];
            if (protocol.isActive && protocol.weightedAPY > bestWeightedAPY) {
                bestWeightedAPY = protocol.weightedAPY;
                bestProtocol = protocolNames[i];
            }
        }
        
        return bestProtocol;
    }
    
    /**
     * @dev Internal: Deploy funds to a specific protocol
     */
    function _deployToProtocol(string memory _protocolName, uint256 _amount) internal {
        // This is a simplified implementation
        // In reality, this would interact with the specific protocol's deposit function
        
        // For example, if it's Aave:
        // IAaveLendingPool(pool).deposit(address(asset), _amount, address(this), 0);
        
        // For now, we'll just approve and simulate the deposit
        asset.safeApprove(supportedProtocols[_protocolName].protocolAddress, _amount);
        
        // Emit event for tracking
        emit FundsDeployed(_protocolName, _amount);
    }
    
    /**
     * @dev Internal: Withdraw funds from a specific protocol
     */
    function _withdrawFromProtocol(string memory _protocolName, uint256 _amount) internal {
        // This is a simplified implementation
        // In reality, this would interact with the specific protocol's withdraw function
        
        // For example, if it's Aave:
        // IAaveLendingPool(pool).withdraw(address(asset), _amount, address(this));
        
        emit FundsWithdrawn(_protocolName, _amount);
    }
    
    /**
     * @dev Internal: Harvest yield from a specific protocol
     */
    function _harvestFromProtocol(string memory _protocolName) internal returns (uint256) {
        // This is a simplified implementation
        // In reality, this would claim rewards or harvest yield
        
        // For example, if it's Aave:
        // return IAaveLendingPool(pool).getAccountLiquidity(address(this));
        
        // For demo purposes, return a mock yield
        return (currentPosition.amount * 50) / 10000; // 0.5% yield
    }
    
    /**
     * @dev Internal: Bridge funds to another chain
     */
    function _bridgeFunds(string memory _protocolName, uint256 _amount, uint256 _targetChainId) internal {
        // This is a simplified implementation
        // In reality, this would interact with a bridge protocol like LI.FI or Socket
        
        // Approve bridge router to spend tokens
        asset.safeApprove(bridgeRouter, _amount);
        
        // Bridge call would go here
        // IBridgeRouter(bridgeRouter).bridge{value: msg.value}(...);
        
        emit FundsDeployed(_protocolName, _amount);
    }
    
    /**
     * @dev Internal: Rebalance to a new protocol
     */
    function _rebalanceToProtocol(string memory _newProtocol) internal {
        string memory oldProtocol = currentPosition.protocolName;
        uint256 amount = currentPosition.amount;
        
        // Withdraw from current protocol
        _withdrawFromProtocol(oldProtocol, amount);
        
        // Deploy to new protocol
        _deployToProtocol(_newProtocol, amount);
        
        // Update position
        currentPosition.protocolName = _newProtocol;
        currentPosition.lastDeposit = block.timestamp;
        
        emit StrategyRebalanced(oldProtocol, _newProtocol, amount);
    }
    
    /**
     * @dev Internal: Get total assets
     */
    function _getTotalAssets() internal view returns (uint256) {
        // This is a simplified implementation
        // In reality, this would query the protocol for the actual balance
        
        uint256 balance = asset.balanceOf(address(this));
        return balance + currentPosition.amount;
    }
    
    /**
     * @dev Initialize supported protocols
     */
    function _initializeSupportedProtocols() internal {
        // Aave V3 on Ethereum
        supportedProtocols["Aave V3"] = ProtocolInfo({
            name: "Aave V3",
            protocolAddress: 0x87870Bca3F236dC72f344005bF9C4021A6E358A1,
            chainId: 1, // Ethereum
            currentAPY: 520, // 5.2%
            weightedAPY: 0, // Will be calculated
            isActive: true
        });
        protocolNames.push("Aave V3");
        
        // Spark on Arbitrum
        supportedProtocols["Spark"] = ProtocolInfo({
            name: "Spark",
            protocolAddress: 0x93091E89f6562C256e3C4633740E6E5764C92B7F,
            chainId: 42161, // Arbitrum
            currentAPY: 480, // 4.8%
            weightedAPY: 0, // Will be calculated
            isActive: true
        });
        protocolNames.push("Spark");
        
        // Compound on Ethereum
        supportedProtocols["Compound"] = ProtocolInfo({
            name: "Compound",
            protocolAddress: 0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B,
            chainId: 1, // Ethereum
            currentAPY: 450, // 4.5%
            weightedAPY: 0, // Will be calculated
            isActive: true
        });
        protocolNames.push("Compound");
        
        // Morpho on Optimism
        supportedProtocols["Morpho"] = ProtocolInfo({
            name: "Morpho",
            protocolAddress: 0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37AFFFF3,
            chainId: 10, // Optimism
            currentAPY: 610, // 6.1%
            weightedAPY: 0, // Will be calculated
            isActive: true
        });
        protocolNames.push("Morpho");
        
        // Calculate initial weighted APYs
        _updateAllWeightedAPYs();
    }
    
    /**
     * @dev Update weighted APYs for all protocols
     */
    function _updateAllWeightedAPYs() internal {
        for (uint256 i = 0; i < protocolNames.length; i++) {
            string memory name = protocolNames[i];
            uint256 pgs = scorer.getPGS(name);
            supportedProtocols[name].weightedAPY = (supportedProtocols[name].currentAPY * pgs) / 100;
        }
    }
}