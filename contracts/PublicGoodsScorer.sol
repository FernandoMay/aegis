// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title PublicGoodsScorer
 * @dev Contract that calculates and manages Public Good Scores (PGS) for DeFi protocols
 * @notice This contract evaluates protocols based on their contribution to public goods
 */
contract PublicGoodsScorer is Ownable {
    using Counters for Counters.Counter;
    
    struct ProtocolMetrics {
        bool isOpenSource;
        bool hasGrantsProgram;
        bool isGovernedByDAO;
        uint256 publicGoodsTreasuryPercentage; // in basis points (10000 = 100%)
        uint256 lastUpdated;
        bool isActive;
    }
    
    struct Protocol {
        string name;
        string chain;
        address protocolAddress;
        ProtocolMetrics metrics;
        uint256 pgs; // Public Good Score (0-200, where 100 is neutral, 200 is max)
    }
    
    mapping(string => Protocol) public protocols;
    string[] public protocolList;
    
    Counters.Counter private _protocolIds;
    
    event ProtocolAdded(string indexed name, string chain, address protocolAddress);
    event ProtocolUpdated(string indexed name, uint256 newPGS);
    event ProtocolDeactivated(string indexed name);
    
    modifier onlyValidProtocol(string memory _name) {
        require(bytes(protocols[_name].name).length > 0, "Protocol does not exist");
        require(protocols[_name].metrics.isActive, "Protocol is not active");
        _;
    }
    
    constructor() {
        // Initialize with some well-known protocols
        _addInitialProtocols();
    }
    
    /**
     * @dev Add a new protocol to be scored
     */
    function addProtocol(
        string memory _name,
        string memory _chain,
        address _protocolAddress,
        ProtocolMetrics memory _metrics
    ) external onlyOwner {
        require(bytes(protocols[_name].name).length == 0, "Protocol already exists");
        require(_protocolAddress != address(0), "Invalid protocol address");
        
        uint256 pgs = _calculatePGS(_metrics);
        
        protocols[_name] = Protocol({
            name: _name,
            chain: _chain,
            protocolAddress: _protocolAddress,
            metrics: _metrics,
            pgs: pgs
        });
        
        protocolList.push(_name);
        _protocolIds.increment();
        
        emit ProtocolAdded(_name, _chain, _protocolAddress);
    }
    
    /**
     * @dev Update protocol metrics and recalculate PGS
     */
    function updateProtocolMetrics(
        string memory _name,
        ProtocolMetrics memory _metrics
    ) external onlyOwner onlyValidProtocol(_name) {
        uint256 newPGS = _calculatePGS(_metrics);
        
        protocols[_name].metrics = _metrics;
        protocols[_name].metrics.lastUpdated = block.timestamp;
        protocols[_name].pgs = newPGS;
        
        emit ProtocolUpdated(_name, newPGS);
    }
    
    /**
     * @dev Deactivate a protocol (soft delete)
     */
    function deactivateProtocol(string memory _name) external onlyOwner onlyValidProtocol(_name) {
        protocols[_name].metrics.isActive = false;
        emit ProtocolDeactivated(_name);
    }
    
    /**
     * @dev Get the Public Good Score for a protocol
     */
    function getPGS(string memory _name) external view returns (uint256) {
        require(bytes(protocols[_name].name).length > 0, "Protocol does not exist");
        return protocols[_name].pgs;
    }
    
    /**
     * @dev Get full protocol information
     */
    function getProtocol(string memory _name) external view returns (Protocol memory) {
        require(bytes(protocols[_name].name).length > 0, "Protocol does not exist");
        return protocols[_name];
    }
    
    /**
     * @dev Get all active protocols
     */
    function getActiveProtocols() external view returns (Protocol[] memory) {
        uint256 activeCount = 0;
        
        // Count active protocols
        for (uint256 i = 0; i < protocolList.length; i++) {
            if (protocols[protocolList[i]].metrics.isActive) {
                activeCount++;
            }
        }
        
        // Create array of active protocols
        Protocol[] memory activeProtocols = new Protocol[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < protocolList.length; i++) {
            if (protocols[protocolList[i]].metrics.isActive) {
                activeProtocols[index] = protocols[protocolList[i]];
                index++;
            }
        }
        
        return activeProtocols;
    }
    
    /**
     * @dev Calculate weighted APY using PGS
     */
    function calculateWeightedAPY(
        string memory _name, 
        uint256 _baseAPY // in basis points (10000 = 100%)
    ) external view returns (uint256) {
        require(bytes(protocols[_name].name).length > 0, "Protocol does not exist");
        require(protocols[_name].metrics.isActive, "Protocol is not active");
        
        uint256 pgs = protocols[_name].pgs;
        
        // Weighted APY = Base APY * (PGS / 100)
        // PGS of 100 = neutral (1.0x), 200 = double (2.0x), 50 = half (0.5x)
        return (_baseAPY * pgs) / 100;
    }
    
    /**
     * @dev Internal function to calculate PGS based on metrics
     */
    function _calculatePGS(ProtocolMetrics memory _metrics) internal pure returns (uint256) {
        uint256 score = 100; // Base score
        
        // Open source bonus: +20 points
        if (_metrics.isOpenSource) {
            score += 20;
        }
        
        // Grants program bonus: +25 points
        if (_metrics.hasGrantsProgram) {
            score += 25;
        }
        
        // DAO governance bonus: +15 points
        if (_metrics.isGovernedByDAO) {
            score += 15;
        }
        
        // Public goods treasury percentage: up to +40 points
        // 10% = 10 points, 20% = 20 points, etc. (max 40 points at 40%+)
        uint256 treasuryBonus = (_metrics.publicGoodsTreasuryPercentage * 40) / 4000;
        if (treasuryBonus > 40) treasuryBonus = 40;
        score += treasuryBonus;
        
        // Cap at 200
        if (score > 200) score = 200;
        
        return score;
    }
    
    /**
     * @dev Initialize with well-known protocols
     */
    function _addInitialProtocols() internal {
        // Aave V3 on Ethereum
        ProtocolMetrics memory aaveMetrics = ProtocolMetrics({
            isOpenSource: true,
            hasGrantsProgram: true,
            isGovernedByDAO: true,
            publicGoodsTreasuryPercentage: 1500, // 15%
            lastUpdated: block.timestamp,
            isActive: true
        });
        
        protocols["Aave V3"] = Protocol({
            name: "Aave V3",
            chain: "Ethereum",
            protocolAddress: 0x87870Bca3F236dC72f344005bF9C4021A6E358A1, // Example address
            metrics: aaveMetrics,
            pgs: _calculatePGS(aaveMetrics)
        });
        protocolList.push("Aave V3");
        
        // Spark on Arbitrum
        ProtocolMetrics memory sparkMetrics = ProtocolMetrics({
            isOpenSource: true,
            hasGrantsProgram: true,
            isGovernedByDAO: true,
            publicGoodsTreasuryPercentage: 2000, // 20%
            lastUpdated: block.timestamp,
            isActive: true
        });
        
        protocols["Spark"] = Protocol({
            name: "Spark",
            chain: "Arbitrum",
            protocolAddress: 0x93091E89f6562C256e3C4633740E6E5764C92B7F, // Example address
            metrics: sparkMetrics,
            pgs: _calculatePGS(sparkMetrics)
        });
        protocolList.push("Spark");
        
        // Compound on Ethereum
        ProtocolMetrics memory compoundMetrics = ProtocolMetrics({
            isOpenSource: true,
            hasGrantsProgram: false,
            isGovernedByDAO: true,
            publicGoodsTreasuryPercentage: 1000, // 10%
            lastUpdated: block.timestamp,
            isActive: true
        });
        
        protocols["Compound"] = Protocol({
            name: "Compound",
            chain: "Ethereum",
            protocolAddress: 0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B, // Example address
            metrics: compoundMetrics,
            pgs: _calculatePGS(compoundMetrics)
        });
        protocolList.push("Compound");
        
        // Morpho on Optimism
        ProtocolMetrics memory morphoMetrics = ProtocolMetrics({
            isOpenSource: true,
            hasGrantsProgram: true,
            isGovernedByDAO: false,
            publicGoodsTreasuryPercentage: 500, // 5%
            lastUpdated: block.timestamp,
            isActive: true
        });
        
        protocols["Morpho"] = Protocol({
            name: "Morpho",
            chain: "Optimism",
            protocolAddress: 0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37AFFFF3, // Example address
            metrics: morphoMetrics,
            pgs: _calculatePGS(morphoMetrics)
        });
        protocolList.push("Morpho");
        
        _protocolIds.increment();
        _protocolIds.increment();
        _protocolIds.increment();
        _protocolIds.increment();
    }
    
    /**
     * @dev Get total number of protocols
     */
    function getProtocolCount() external view returns (uint256) {
        return _protocolIds.current();
    }
}