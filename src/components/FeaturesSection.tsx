'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  TrendingUp, 
  Globe, 
  Heart, 
  ArrowRight,
  Zap,
  Star,
  Sparkles,
  BarChart3,
  Network,
  Award,
  Target,
  Infinity,
  RefreshCw
} from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: "Public Good Score",
    description: "Revolutionary PGS metric evaluates protocols based on their social impact, creating a new standard for responsible DeFi.",
    badge: "Innovation",
    color: "blue",
    stats: ["200 Max Score", "4 Metrics", "Real-time Updates"],
    detailedDescription: "Our proprietary algorithm evaluates protocols across open source status, grants programs, DAO governance, and public goods treasury allocation."
  },
  {
    icon: Network,
    title: "Multi-Chain Optimization",
    description: "Seamlessly deploy capital across Ethereum, Arbitrum, and Optimism to find the best risk-adjusted returns.",
    badge: "Scalable",
    color: "purple",
    stats: ["3 Chains", "4+ Protocols", "Auto-Bridging"],
    detailedDescription: "Advanced cross-chain routing automatically identifies and capitalizes on the highest yield opportunities while maintaining security."
  },
  {
    icon: TrendingUp,
    title: "Smart Rebalancing",
    description: "AI-powered strategy automatically rebalances based on PGS-weighted APY, maximizing both returns and impact.",
    badge: "Automated",
    color: "green",
    stats: ["Real-time", "Gas Optimized", "Zero Slippage"],
    detailedDescription: "Our sophisticated algorithms monitor market conditions 24/7, executing optimal rebalancing strategies without manual intervention."
  },
  {
    icon: Heart,
    title: "Impact Amplification",
    description: "Every yield generated is automatically donated to public goods, creating sustainable funding for ecosystem growth.",
    badge: "Impact",
    color: "pink",
    stats: ["100% Yield", "Transparent", "On-chain"],
    detailedDescription: "All generated yield flows directly to public goods through Octant's payment splitter, ensuring complete transparency and accountability."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive dashboard with real-time metrics, performance tracking, and impact visualization.",
    badge: "Analytics",
    color: "orange",
    stats: ["Live Data", "Custom Reports", "API Access"],
    detailedDescription: "Professional-grade analytics provide deep insights into portfolio performance, impact metrics, and optimization opportunities."
  },
  {
    icon: Award,
    title: "Octant Integration",
    description: "Perfect integration with Octant v2 Yield Donating Vaults and ERC-4626 standards for maximum compatibility.",
    badge: "Compatible",
    color: "indigo",
    stats: ["ERC-4626", "Yearn v3", "Audited"],
    detailedDescription: "Built on Octant's robust infrastructure, ensuring security, composability, and seamless integration with the broader ecosystem."
  }
]

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-950/20',
        border: 'border-blue-200 dark:border-blue-800',
        icon: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-950/20',
        border: 'border-purple-200 dark:border-purple-800',
        icon: 'text-purple-600',
        badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-950/20',
        border: 'border-green-200 dark:border-green-800',
        icon: 'text-green-600',
        badge: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
      },
      pink: {
        bg: 'bg-pink-50 dark:bg-pink-950/20',
        border: 'border-pink-200 dark:border-pink-800',
        icon: 'text-pink-600',
        badge: 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200'
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-950/20',
        border: 'border-orange-200 dark:border-orange-800',
        icon: 'text-orange-600',
        badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200'
      },
      indigo: {
        bg: 'bg-indigo-50 dark:bg-indigo-950/20',
        border: 'border-indigo-200 dark:border-indigo-800',
        icon: 'text-indigo-600',
        badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
      }
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 gap-2">
            <Star className="w-4 h-4" />
            Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Revolutionary Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Impact Investing
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Aegis combines cutting-edge DeFi technology with social impact metrics to create 
            the most advanced yield optimization platform for public goods funding.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color)
            const isHovered = hoveredFeature === index
            
            return (
              <Card 
                key={feature.title}
                className={`relative transition-all duration-300 cursor-pointer ${
                  isHovered 
                    ? `${colors.bg} ${colors.border} border-2 shadow-xl transform -translate-y-2` 
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${colors.bg} ${isHovered ? 'scale-110' : ''} transition-transform`}>
                      <feature.icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <Badge className={colors.badge}>
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {feature.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                          {stat}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Detailed Description (shown on hover) */}
                  <div className={`transition-all duration-300 overflow-hidden ${
                    isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {feature.detailedDescription}
                    </p>
                  </div>

                  {/* Learn More Button */}
                  <Button 
                    variant="ghost" 
                    className="w-full group justify-between p-0 h-auto hover:bg-transparent"
                  >
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${
                      isHovered ? 'translate-x-1' : ''
                    }`} />
                  </Button>
                </CardContent>

                {/* Hover Effect Overlay */}
                {isHovered && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-blue-600/10 rounded-bl-full" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-transparent to-purple-600/10 rounded-tr-full" />
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                Ready to maximize your impact?
              </span>
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}