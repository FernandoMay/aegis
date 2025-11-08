import { NextRequest, NextResponse } from 'next/server'

// Mock strategy data
const mockStrategy = {
  name: 'Aegis Multi-Chain Strategy',
  description: 'Optimización de rendimiento con impacto en bienes públicos',
  tvl: 1250000, // $1.25M
  currentProtocol: 'Spark',
  currentChain: 'Arbitrum',
  lastRebalance: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  totalYieldGenerated: 45678.90,
  apr: 7.2,
  publicGoodScore: 1.5,
  isActive: true,
  position: {
    protocol: 'Spark',
    amount: 1250000,
    depositedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
    lastHarvest: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
  }
}

export async function GET() {
  try {
    // Simulate real-time updates
    const liveStrategy = {
      ...mockStrategy,
      tvl: mockStrategy.tvl + (Math.random() - 0.5) * 10000,
      totalYieldGenerated: mockStrategy.totalYieldGenerated + Math.random() * 100,
      apr: mockStrategy.apr + (Math.random() - 0.5) * 0.1,
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: liveStrategy
    })
  } catch (error) {
    console.error('Error fetching strategy:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch strategy' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()

    if (!action) {
      return NextResponse.json(
        { success: false, error: 'Action is required' },
        { status: 400 }
      )
    }

    let result
    switch (action) {
      case 'rebalance':
        // Simulate rebalancing to a different protocol
        const protocols = ['Aave V3', 'Spark', 'Compound', 'Morpho']
        const newProtocol = protocols[Math.floor(Math.random() * protocols.length)]
        
        result = {
          transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          oldProtocol: mockStrategy.currentProtocol,
          newProtocol: newProtocol,
          amount: mockStrategy.tvl,
          timestamp: new Date().toISOString(),
          status: 'success'
        }
        
        // Update mock strategy
        mockStrategy.currentProtocol = newProtocol
        mockStrategy.lastRebalance = new Date().toISOString()
        break

      case 'harvest':
        const yieldAmount = (Math.random() * 1000).toFixed(2)
        
        result = {
          transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          yield: yieldAmount,
          protocol: mockStrategy.currentProtocol,
          timestamp: new Date().toISOString(),
          status: 'success'
        }
        
        // Update mock strategy
        mockStrategy.totalYieldGenerated += parseFloat(yieldAmount)
        mockStrategy.position.lastHarvest = new Date().toISOString()
        break

      case 'deposit':
        const { amount } = await request.json()
        const depositAmount = amount || 1000
        
        result = {
          transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          amount: depositAmount,
          protocol: mockStrategy.currentProtocol,
          timestamp: new Date().toISOString(),
          status: 'success'
        }
        
        // Update mock strategy
        mockStrategy.tvl += depositAmount
        mockStrategy.position.amount += depositAmount
        break

      case 'withdraw':
        const { withdrawAmount } = await request.json()
        const amountToWithdraw = withdrawAmount || 1000
        
        if (amountToWithdraw > mockStrategy.tvl) {
          return NextResponse.json(
            { success: false, error: 'Insufficient balance' },
            { status: 400 }
          )
        }
        
        result = {
          transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          amount: amountToWithdraw,
          protocol: mockStrategy.currentProtocol,
          timestamp: new Date().toISOString(),
          status: 'success'
        }
        
        // Update mock strategy
        mockStrategy.tvl -= amountToWithdraw
        mockStrategy.position.amount -= amountToWithdraw
        break

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error processing strategy action:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process action' },
      { status: 500 }
    )
  }
}