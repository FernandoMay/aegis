 'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Quote,
  Star,
  Heart,
  Users,
  Globe,
  Award,
  TrendingUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Zap,
  Target,
  Shield
} from 'lucide-react'

const testimonials = [
  {
    name: "Alex Chen",
    role: "DeFi Investor",
    avatar: "👨‍💼",
    content: "Aegis has completely changed how I think about yield farming. I'm earning competitive returns while supporting public goods. It's a win-win!",
    rating: 5,
    impact: "$12,450 generated for public goods"
  },
  {
    name: "Sarah Martinez",
    role: "Open Source Developer",
    avatar: "👩‍💻",
    content: "As a developer, I love that Aegis supports protocols that contribute to the ecosystem. The PGS system is brilliant!",
    rating: 5,
    impact: "Supporting 4 open source projects"
  },
  {
    name: "Michael Kumar",
    role: "DAO Treasury Manager",
    avatar: "🧑‍💼",
    content: "Our DAO uses Aegis for treasury management. The automated rebalancing and public good donation features are exactly what we needed.",
    rating: 5,
    impact: "$45,000+ in sustainable funding"
  }
]

const impactStats = [
  {
    icon: Heart,
    value: "$2.5M+",
    label: "Total Public Good Funding",
    description: "Yield donated to public goods projects",
    color: "pink"
  },
  {
    icon: Users,
    value: "10,000+",
    label: "Active Users",
    description: "Individuals and organizations using Aegis",
    color: "blue"
  },
  {
    icon: Globe,
    value: "50+",
    label: "Public Goods Projects",
    description: "Projects receiving sustainable funding",
    color: "green"
  },
  {
    icon: Award,
    value: "15+",
    label: "Partner Protocols",
    description: "DeFi protocols with high PGS scores",
    color: "orange"
  }
]

const featuredProjects = [
  {
    name: "Ethereum Foundation",
    category: "Infrastructure",
    description: "Core Ethereum development and research",
    funding: "$450,000",
    pgs: 1.8,
    logo: "🔷"
  },
  {
    name: "Gitcoin Grants",
    category: "Open Source",
    description: "Funding for public goods developers",
    funding: "$320,000",
    pgs: 1.6,
    logo: "🚀"
  },
  {
    name: "Climate Collective",
    category: "Climate",
    description: "Web3 climate solutions and research",
    funding: "$280,000",
    pgs: 1.4,
    logo: "🌍"
  }
]

export default function ImpactSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  const navigate = (path: string) => {
    try {
      if (path.startsWith('/')) router.push(path)
      else router.push(path.startsWith('#') ? path : `#${path}`)
    } catch (e) {
      if (path.startsWith('/')) window.location.href = path
      else window.location.hash = path.startsWith('#') ? path.substring(1) : path
    }
  }

  useEffect(() => {
    setIsVisible(true)
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const getColorClasses = (color: string) => {
    const colors = {
      pink: {
        bg: 'bg-pink-50 dark:bg-pink-950/20',
        icon: 'text-pink-600',
        border: 'border-pink-200 dark:border-pink-800'
      },
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-950/20',
        icon: 'text-blue-600',
        border: 'border-blue-200 dark:border-blue-800'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-950/20',
        icon: 'text-green-600',
        border: 'border-green-200 dark:border-green-800'
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-950/20',
        icon: 'text-orange-600',
        border: 'border-orange-200 dark:border-orange-800'
      }
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section id="impact" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/20" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-pink-400/10 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-blue-400/10 rounded-full animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-green-400/10 rounded-full animate-pulse delay-2000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 gap-2">
            <Heart className="w-4 h-4" />
            Real Impact
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Creating Sustainable
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {" "} Public Good Funding
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Every dollar deposited in Aegis creates ripple effects across the ecosystem. 
            See how we're transforming DeFi into a force for public good.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impactStats.map((stat, index) => {
            const colors = getColorClasses(stat.color)
            
            return (
              <Card 
                key={stat.label}
                className={`text-center transition-all duration-500 hover:shadow-lg ${colors.border} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colors.bg} mb-4`}>
                    <stat.icon className={`w-8 h-8 ${colors.icon}`} />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {stat.label}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              What Our Users Say
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Real stories from real users making real impact
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <Quote className="w-12 h-12 text-blue-600 opacity-20" />
                  <div className="flex gap-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prevTestimonial}
                      className="rounded-full"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={nextTestimonial}
                      className="rounded-full"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <Heart className="w-4 h-4" />
                    <span>{testimonials[currentTestimonial].impact}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Featured Public Good Projects
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Projects receiving sustainable funding through Aegis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <Card 
                key={project.name}
                className="transition-all duration-500 hover:shadow-lg border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">
                      {project.logo}
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <Target className="w-3 h-3" />
                      PGS: {project.pgs}
                    </Badge>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {project.name}
                  </h4>
                  
                  <Badge variant="secondary" className="mb-3">
                    {project.category}
                  </Badge>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-green-600">
                        {project.funding}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-500">
                        Total Funding
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-6 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-500" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Ready to Make an Impact?
              </h3>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Join thousands of users who are already generating sustainable funding for public goods 
              while earning competitive yields.
            </p>
            <div className="flex items-center gap-4">
                    <Button type="button" onClick={() => navigate('#dashboard')} className="gap-2 bg-blue-600 hover:bg-blue-700">
                Start Earning & Giving
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/reports')}>
                View Impact Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}