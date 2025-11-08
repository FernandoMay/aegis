'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  TrendingUp, 
  Globe, 
  Heart, 
  ArrowRight,
  Zap,
  Star,
  Sparkles,
  ArrowDown,
  Play
} from 'lucide-react'

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const rotatingTexts = [
    "Maximizing Yield",
    "Amplifying Impact",
    "Building Future",
    "Creating Change"
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const stats = [
    { value: "$1.25M+", label: "TVL", icon: TrendingUp },
    { value: "7.2%", label: "Impact APR", icon: Shield },
    { value: "45K+", label: "Public Good Funds", icon: Heart },
    { value: "4", label: "Chains", icon: Globe }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000" />
        
        {/* Floating Elements */}
        <div className="absolute top-32 left-20 animate-bounce delay-300">
          <Shield className="w-8 h-8 text-blue-600/30" />
        </div>
        <div className="absolute top-52 right-32 animate-bounce delay-700">
          <Heart className="w-6 h-6 text-pink-600/30" />
        </div>
        <div className="absolute bottom-40 left-40 animate-bounce delay-1100">
          <TrendingUp className="w-7 h-7 text-green-600/30" />
        </div>
        <div className="absolute bottom-52 right-20 animate-bounce delay-1500">
          <Globe className="w-9 h-9 text-purple-600/30" />
        </div>
      </div>

  {/* Grid Pattern (simplified for parser stability) */}
  <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-slate-50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">
              <Star className="w-4 h-4 mr-1" />
              
            </Badge>
            <span className="text-sm font-medium">

            </span>
            <Sparkles className="w-4 h-4" />
          </div>

          {/* Main Heading */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Aegis
              </span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl text-slate-700 dark:text-slate-300">
                Public Good Yield
                <br />
                <span className="relative inline-block">
                  Optimizer
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse" />
                </span>
              </span>
            </h1>
          </div>

          {/* Rotating Text */}
          <div className={`h-8 mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="text-xl sm:text-2xl lg:text-3xl text-slate-600 dark:text-slate-400 font-medium">
              {rotatingTexts.map((text, index) => (
                <span
                  key={text}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    index === currentTextIndex 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform idle capital into sustainable public good funding. 
              Our revolutionary <span className="font-semibold text-blue-600 dark:text-blue-400">Public Good Score (PGS)</span> 
              optimizes yield across multiple chains while maximizing social impact.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Button size="lg" className="gap-3 bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 h-auto group">
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Launch Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="gap-3 text-lg px-8 py-6 h-auto group">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-8 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center group">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-slate-400" />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent" />
    </section>
  )
}