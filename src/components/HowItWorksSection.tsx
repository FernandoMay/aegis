 'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight,
  Wallet,
  Search,
  TrendingUp,
  Heart,
  Shield,
  Globe,
  Zap,
  CheckCircle,
  ArrowDown,
  Play
} from 'lucide-react'

const steps = [
  {
    number: 1,
    title: "Deposit Assets",
    description: "Users deposit USDC or other supported assets into the Aegis vault through our intuitive interface.",
    icon: Wallet,
    color: "blue",
    details: [
      "Connect your wallet securely",
      "Choose your deposit amount",
      "Assets are immediately put to work"
    ],
    visual: "💰"
  },
  {
    number: 2,
    title: "Smart Analysis",
    description: "Our AI-powered system analyzes all supported protocols across multiple chains using the PGS algorithm.",
    icon: Search,
    color: "purple",
    details: [
      "Real-time APY monitoring",
      "PGS calculation for each protocol",
      "Risk assessment and optimization"
    ],
    visual: "🔍"
  },
  {
    number: 3,
    title: "Optimal Deployment",
    description: "Capital is automatically deployed to the protocol with the highest PGS-weighted APY.",
    icon: TrendingUp,
    color: "green",
    details: [
      "Cross-chain bridging if needed",
      "Gas-optimized transactions",
      "Slippage minimization"
    ],
    visual: "📈"
  },
  {
    number: 4,
    title: "Yield Generation",
    description: "Your assets generate yield through the selected DeFi protocol while maintaining full security.",
    icon: Shield,
    color: "orange",
    details: [
      "24/7 yield monitoring",
      "Automated compounding",
      "Risk management protocols"
    ],
    visual: "🛡️"
  },
  {
    number: 5,
    title: "Impact Donation",
    description: "All generated yield is automatically donated to public goods through Octant's payment splitter.",
    icon: Heart,
    color: "pink",
    details: [
      "100% of yield donated",
      "Transparent on-chain tracking",
      "Public good fund allocation"
    ],
    visual: "❤️"
  },
  {
    number: 6,
    title: "Continuous Optimization",
    description: "The system continuously monitors and rebalances to ensure optimal returns and impact.",
    icon: Zap,
    color: "indigo",
    details: [
      "Real-time rebalancing",
      "Market condition adaptation",
      "Performance optimization"
    ],
    visual: "⚡"
  }
]

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  const navigate = (hash: string) => {
    try {
      router.push(hash.startsWith('#') ? hash : `#${hash}`)
    } catch (e) {
      window.location.hash = hash.startsWith('#') ? hash.substring(1) : hash
    }
  }

  useEffect(() => {
    setIsVisible(true)
    
    // Auto-advance through steps
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-950/20',
        icon: 'text-blue-600',
        border: 'border-blue-200 dark:border-blue-800',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-950/20',
        icon: 'text-purple-600',
        border: 'border-purple-200 dark:border-purple-800',
        button: 'bg-purple-600 hover:bg-purple-700'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-950/20',
        icon: 'text-green-600',
        border: 'border-green-200 dark:border-green-800',
        button: 'bg-green-600 hover:bg-green-700'
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-950/20',
        icon: 'text-orange-600',
        border: 'border-orange-200 dark:border-orange-800',
        button: 'bg-orange-600 hover:bg-orange-700'
      },
      pink: {
        bg: 'bg-pink-50 dark:bg-pink-950/20',
        icon: 'text-pink-600',
        border: 'border-pink-200 dark:border-pink-800',
        button: 'bg-pink-600 hover:bg-pink-700'
      },
      indigo: {
        bg: 'bg-indigo-50 dark:bg-indigo-950/20',
        icon: 'text-indigo-600',
        border: 'border-indigo-200 dark:border-indigo-800',
        button: 'bg-indigo-600 hover:bg-indigo-700'
      }
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 gap-2">
            <Play className="w-4 h-4" />
            How It Works
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Six Simple Steps to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Maximum Impact
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Our streamlined process makes it easy to deploy your capital for both financial returns 
            and social impact. No complex DeFi knowledge required.
          </p>
        </div>

        {/* Interactive Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Steps List */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const colors = getColorClasses(step.color)
              const isActive = activeStep === index
              
              return (
                <Card 
                  key={step.number}
                  className={`cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? `${colors.bg} ${colors.border} border-2 shadow-lg transform scale-105` 
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.bg} flex-shrink-0`}>
                        <step.icon className={`w-6 h-6 ${colors.icon}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-sm font-bold ${colors.icon}`}>
                            Step {step.number}
                          </span>
                          {isActive && (
                            <Badge variant="secondary" className="text-xs">
                              Active
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      <ArrowRight className={`w-5 h-5 text-slate-400 transition-transform ${
                        isActive ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Visual Display */}
          <div className="relative">
            <div className="sticky top-8">
              <Card className="border-slate-200 dark:border-slate-700 overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center">
                    {/* Large Visual */}
                    <div className="text-8xl mb-6 animate-bounce">
                      {steps[activeStep].visual}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                      {steps[activeStep].title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                      {steps[activeStep].description}
                    </p>
                    
                    {/* Step Details */}
                    <div className="space-y-3 mb-6">
                      {steps[activeStep].details.map((detail, index) => (
                        <div key={index} className="flex items-center gap-3 text-left">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                      {steps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === activeStep 
                              ? 'w-8 bg-blue-600' 
                              : 'bg-slate-300 dark:bg-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <Button type="button" className={`gap-2 ${getColorClasses(steps[activeStep].color).button}`} onClick={() => navigate('#dashboard')}>
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="relative">
          <div className="hidden lg:block">
            <div className="flex items-center justify-between relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 transform -translate-y-1/2" />
              
              {/* Steps */}
              {steps.map((step, index) => (
                <div key={step.number} className="relative z-10">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 hover:scale-110 cursor-pointer ${
                    getColorClasses(step.color).button
                  }`}>
                    {step.number}
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      {step.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-6 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Ready to Get Started?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Join thousands of users maximizing their impact with Aegis
              </p>
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              Launch App
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}