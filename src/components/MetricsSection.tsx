'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Heart,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Target,
  Zap,
  Shield,
  BarChart3,
  Activity
} from 'lucide-react'

interface Metric {
  label: string
  value: string
  change: number
  icon: any
  description: string
  color: string
  prefix?: string
  suffix?: string
}

const metrics: Metric[] = [
  {
    label: "Total Value Locked",
    value: "1250000",
    change: 12.5,
    icon: DollarSign,
    description: "Total assets deployed across all strategies",
    color: "blue",
    prefix: "$"
  },
  {
    label: "Impact APR",
    value: "7.2",
    change: 2.3,
    icon: TrendingUp,
    description: "PGS-weighted annual percentage rate",
    color: "green",
    suffix: "%"
  },
  {
    label: "Public Good Funds",
    value: "45678",
    change: 18.7,
    icon: Heart,
    description: "Total yield donated to public goods",
    color: "pink",
    prefix: "$"
  },
  {
    label: "Active Users",
    value: "2847",
    change: 25.1,
    icon: Users,
    description: "Unique wallets using Aegis",
    color: "purple"
  },
  {
    label: "Protocols Supported",
    value: "12",
    change: 8.3,
    icon: Shield,
    description: "DeFi protocols integrated",
    color: "orange"
  },
  {
    label: "Chains Connected",
    value: "4",
    change: 0,
    icon: Globe,
    description: "Blockchains supported",
    color: "indigo"
  }
]

export default function MetricsSection() {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Animate values on mount
    const timeouts: NodeJS.Timeout[] = []
    
    metrics.forEach((metric, index) => {
      const timeout = setTimeout(() => {
        const targetValue = parseFloat(metric.value)
        const duration = 2000
        const steps = 60
        const increment = targetValue / steps
        let current = 0
        
        const animation = setInterval(() => {
          current += increment
          if (current >= targetValue) {
            current = targetValue
            clearInterval(animation)
          }
          
          setAnimatedValues(prev => ({
            ...prev,
            [metric.label]: current
          }))
        }, duration / steps)
      }, index * 200)
      
      timeouts.push(timeout)
    })
    
    return () => timeouts.forEach(clearTimeout)
  }, [])

  const formatValue = (metric: Metric) => {
    const value = animatedValues[metric.label] || 0
    
    if (metric.label === "Total Value Locked" || metric.label === "Public Good Funds") {
      return `${metric.prefix}${(value / 1000000).toFixed(2)}M`
    }
    
    if (metric.label === "Impact APR") {
      return `${value.toFixed(1)}${metric.suffix}`
    }
    
    if (metric.label === "Active Users") {
      return Math.floor(value).toLocaleString()
    }
    
    return `${metric.prefix || ''}${Math.floor(value)}${metric.suffix || ''}`
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-950/20',
        icon: 'text-blue-600',
        border: 'border-blue-200 dark:border-blue-800',
        change: 'text-blue-600'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-950/20',
        icon: 'text-green-600',
        border: 'border-green-200 dark:border-green-800',
        change: 'text-green-600'
      },
      pink: {
        bg: 'bg-pink-50 dark:bg-pink-950/20',
        icon: 'text-pink-600',
        border: 'border-pink-200 dark:border-pink-800',
        change: 'text-pink-600'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-950/20',
        icon: 'text-purple-600',
        border: 'border-purple-200 dark:border-purple-800',
        change: 'text-purple-600'
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-950/20',
        icon: 'text-orange-600',
        border: 'border-orange-200 dark:border-orange-800',
        change: 'text-orange-600'
      },
      indigo: {
        bg: 'bg-indigo-50 dark:bg-indigo-950/20',
        icon: 'text-indigo-600',
        border: 'border-indigo-200 dark:border-indigo-800',
        change: 'text-indigo-600'
      }
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
  {/* Background Pattern (simplified for parser stability) */}
  <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-white to-transparent dark:from-slate-900" />
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/10 rounded-full animate-pulse" />
      <div className="absolute top-20 right-20 w-16 h-16 bg-purple-400/10 rounded-full animate-pulse delay-1000" />
      <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-pink-400/10 rounded-full animate-pulse delay-2000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 gap-2">
            <BarChart3 className="w-4 h-4" />
            Live Metrics
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Real-Time Performance
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "} & Impact
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Track our performance in real-time. Every metric represents our commitment to 
            maximizing both financial returns and social impact.
          </p>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, index) => {
            const colors = getColorClasses(metric.color)
            const isPositive = metric.change >= 0
            
            return (
              <Card 
                key={metric.label}
                className={`transition-all duration-500 hover:shadow-lg border ${colors.border} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${colors.bg}`}>
                      <metric.icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      isPositive ? colors.change : 'text-red-600'
                    }`}>
                      {isPositive ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )}
                      {Math.abs(metric.change)}%
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                      {formatValue(metric)}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {metric.label}
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Performance Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Growth Chart */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Growth Trajectory
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Monthly TVL and Impact Growth
                  </p>
                </div>
                <Badge variant="outline" className="gap-2">
                  <Activity className="w-4 h-4" />
                  Live
                </Badge>
              </div>
              
              {/* Simulated Chart */}
              <div className="h-48 flex items-end justify-between gap-2">
                {[40, 65, 45, 80, 55, 90, 70, 100].map((height, index) => (
                  <div key={index} className="flex-1 relative group">
                    <div 
                      className="bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all duration-300 hover:from-blue-500 hover:to-purple-500 group-hover:scale-105"
                      style={{ height: `${height}%` }}
                    />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {Math.floor(height * 12500)}$
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-4 text-xs text-slate-500 dark:text-slate-500">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
              </div>
            </CardContent>
          </Card>

          {/* Impact Distribution */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Impact Distribution
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Where your yield creates change
                  </p>
                </div>
                <Badge variant="outline" className="gap-2">
                  <Target className="w-4 h-4" />
                  Active
                </Badge>
              </div>
              
              <div className="space-y-4">
                {[
                  { category: "Open Source", percentage: 35, color: "blue" },
                  { category: "Public Goods", percentage: 28, color: "green" },
                  { category: "Education", percentage: 22, color: "purple" },
                  { category: "Climate", percentage: 15, color: "pink" }
                ].map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700 dark:text-slate-300">{item.category}</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 h-2 rounded-full transition-all duration-1000`}
                        style={{ width: isVisible ? `${item.percentage}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-slate-100">24/7</span> Optimization
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Audited</span> Smart Contracts
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-slate-100">100%</span> to Public Goods
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}