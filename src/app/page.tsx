'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Shield, TrendingUp, Globe, Heart, ArrowRight, RefreshCw, ExternalLink } from 'lucide-react'

// Import components
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import MetricsSection from '@/components/MetricsSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import ImpactSection from '@/components/ImpactSection'
import Footer from '@/components/Footer'

interface Protocol {
  name: string
  chain: string
  chainId: number
  apy: number
  pgs: number
  weightedApy: number
  isActive: boolean
  protocolAddress: string
  lastUpdated?: string
  metrics?: {
    isOpenSource: boolean
    hasGrantsProgram: boolean
    isGovernedByDAO: boolean
    publicGoodsTreasuryPercentage: number
  }
}

interface Strategy {
  name: string
  description: string
  tvl: number
  currentProtocol: string
  currentChain: string
  lastRebalance: string
  totalYieldGenerated: number
  apr: number
  publicGoodScore: number
  isActive: boolean
  position: {
    protocol: string
    amount: number
    depositedAt: string
    lastHarvest: string
  }
  lastUpdated?: string
}

export default function Home() {
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [strategy, setStrategy] = useState<Strategy | null>(null)
  const [isRebalancing, setIsRebalancing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch data from APIs
  const fetchData = async () => {
    try {
      const [protocolsResponse, strategyResponse] = await Promise.all([
        fetch('/api/protocols'),
        fetch('/api/strategy')
      ])

      if (!protocolsResponse.ok || !strategyResponse.ok) {
        throw new Error('Failed to fetch data')
      }

      const protocolsData = await protocolsResponse.json()
      const strategyData = await strategyResponse.json()

      if (protocolsData.success) {
        setProtocols(protocolsData.data)
      }

      if (strategyData.success) {
        setStrategy(strategyData.data)
      }

      setError(null)
    } catch (err) {
      setError('Failed to load data. Please try again.')
      console.error('Error fetching data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Real-time updates
  useEffect(() => {
    fetchData()
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchData, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const handleRebalance = async () => {
    if (!strategy) return
    
    setIsRebalancing(true)
    try {
      const response = await fetch('/api/strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'rebalance' }),
      })

      const data = await response.json()
      
      if (data.success) {
        // Refresh data after rebalance
        await fetchData()
      } else {
        setError('Rebalance failed. Please try again.')
      }
    } catch (err) {
      setError('Rebalance failed. Please try again.')
      console.error('Error rebalancing:', err)
    } finally {
      setIsRebalancing(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatAPY = (apy: number) => {
    return `${apy.toFixed(2)}%`
  }

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading Aegis Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Metrics Section */}
      <MetricsSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Impact Section */}
      <ImpactSection />

      {/* Dashboard Section */}
      <section id="dashboard" className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4 gap-2">
              <Shield className="w-4 h-4" />
              Live Dashboard
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Real-Time Strategy
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "} Management
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Monitor your Aegis strategy in real-time. See how your capital is working 
              to generate both financial returns and social impact.
            </p>
          </div>

          {error && (
            <div className="text-center mb-8">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchData}>Retry</Button>
            </div>
          )}

          {strategy && (
            <>
              {/* Main Strategy Card */}
              <Card className="mb-8 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        {strategy.name}
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        {strategy.description}
                      </CardDescription>
                    </div>
                    <Button 
                      onClick={handleRebalance}
                      disabled={isRebalancing}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isRebalancing ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Rebalancing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Rebalance Now
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        {formatCurrency(strategy.tvl)}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Total Value Locked</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {strategy.currentProtocol} ({strategy.currentChain})
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Current Strategy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {formatAPY(strategy.apr)}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Current APR</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {formatCurrency(strategy.totalYieldGenerated)}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Total Yield Generated</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Protocol Analysis */}
              <Tabs defaultValue="protocols" className="mb-8">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="protocols">Protocol Analysis</TabsTrigger>
                  <TabsTrigger value="impact">Public Good Impact</TabsTrigger>
                </TabsList>
                
                <TabsContent value="protocols">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        Multi-Chain Protocol Scoring
                      </CardTitle>
                      <CardDescription>
                        APY ponderado por Índice de Bien Público (PGS) - Máximo impacto sostenible
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {protocols.map((protocol, index) => (
                          <div 
                            key={index}
                            className={`p-4 rounded-lg border transition-all ${
                              protocol.name === strategy.currentProtocol
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                                : 'border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-lg">{protocol.name}</h3>
                                <Badge variant="outline">{protocol.chain}</Badge>
                                {protocol.name === strategy.currentProtocol && (
                                  <Badge className="bg-green-600">Active</Badge>
                                )}
                                <Button variant="ghost" size="sm">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">
                                  {formatAPY(protocol.weightedApy)}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                  Weighted APY
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Base APY</span>
                                  <span className="font-medium">{formatAPY(protocol.apy)}</span>
                                </div>
                                <Progress value={protocol.apy * 10} className="h-2" />
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Public Good Score</span>
                                  <span className="font-medium">{protocol.pgs.toFixed(1)}</span>
                                </div>
                                <Progress value={protocol.pgs * 50} className="h-2" />
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Final Score</span>
                                  <span className="font-medium">{formatAPY(protocol.weightedApy)}</span>
                                </div>
                                <Progress value={protocol.weightedApy * 10} className="h-2" />
                              </div>
                            </div>

                            {protocol.metrics && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {protocol.metrics.isOpenSource && (
                                  <Badge variant="secondary" className="text-xs">Open Source</Badge>
                                )}
                                {protocol.metrics.hasGrantsProgram && (
                                  <Badge variant="secondary" className="text-xs">Has Grants</Badge>
                                )}
                                {protocol.metrics.isGovernedByDAO && (
                                  <Badge variant="secondary" className="text-xs">DAO Governed</Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {protocol.metrics.publicGoodsTreasuryPercentage}% to Public Goods
                                </Badge>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="impact">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        Public Good Impact Metrics
                      </CardTitle>
                      <CardDescription>
                        How Aegis creates sustainable funding for public goods
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                          <h3 className="font-semibold text-lg mb-3">Direct Impact</h3>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-blue-600" />
                              All yield automatically donated to public goods
                            </li>
                            <li className="flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-blue-600" />
                              Funding open-source development projects
                            </li>
                            <li className="flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-blue-600" />
                              Supporting digital art and creative commons
                            </li>
                            <li className="flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-blue-600" />
                              Sustainable funding without depleting principal
                            </li>
                          </ul>
                        </div>
                        
                        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg">
                          <h3 className="font-semibold text-lg mb-3">Ecosystem Impact</h3>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-green-600" />
                              Creates market for "good behavior" in DeFi
                            </li>
                            <li className="flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-green-600" />
                              Incentivizes protocols to become more public-good friendly
                            </li>
                            <li className="flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-green-600" />
                              Encourages transparency and open governance
                            </li>
                            <li className="flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-green-600" />
                              Builds virtuous cycle of impact investing
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                          "Con Aegis, no solo estamos financiando el futuro. Estamos incentivando a que el futuro 
                          se construya de una manera más abierta, colaborativa y justa."
                        </p>
                      </div>

                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatCurrency(strategy.totalYieldGenerated)}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Total Donated to Public Goods
                          </div>
                        </div>
                        <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {protocols.filter(p => p.metrics?.hasGrantsProgram).length}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Protocols with Grant Programs
                          </div>
                        </div>
                        <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {formatAPY(strategy.apr)}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Impact-Adjusted APR
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}