'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Twitter, 
  Github, 
  MessageCircle,
  Linkedin,
  Mail,
  Globe,
  Heart,
  ArrowRight,
  ExternalLink,
  BookOpen,
  FileText,
  Users,
  Zap,
  ChevronUp
} from 'lucide-react'

const footerLinks = {
  product: [
    { label: "Dashboard", href: "#dashboard", icon: Shield },
    { label: "Features", href: "#features", icon: Zap },
    { label: "How It Works", href: "#how-it-works", icon: BookOpen },
    { label: "Pricing", href: "#pricing", icon: FileText }
  ],
  resources: [
    { label: "Documentation", href: "#docs", icon: BookOpen },
    { label: "API Reference", href: "#api", icon: FileText },
    { label: "Tutorials", href: "#tutorials", icon: Users },
    { label: "Blog", href: "#blog", icon: Globe }
  ],
  company: [
    { label: "About Us", href: "#about", icon: Users },
    { label: "Careers", href: "#careers", icon: Zap },
    { label: "Contact", href: "#contact", icon: Mail },
    { label: "Partners", href: "#partners", icon: Shield }
  ],
  legal: [
    { label: "Privacy Policy", href: "#privacy", icon: FileText },
    { label: "Terms of Service", href: "#terms", icon: FileText },
    { label: "Cookie Policy", href: "#cookies", icon: FileText },
    { label: "Disclaimer", href: "#disclaimer", icon: Shield }
  ]
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: MessageCircle, href: "#", label: "Community" },
  { icon: Linkedin, href: "#", label: "LinkedIn" }
]

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 3000)
      setEmail("")
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-slate-900 text-slate-100 relative overflow-hidden">
  {/* Background Pattern (simplified for parser stability) */}
  <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-slate-900 via-slate-800 to-transparent" />
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/20 to-purple-900/20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-slate-800 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold">Stay Updated with Aegis</h3>
            </div>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Get the latest updates on new features, protocol integrations, and impact metrics. 
              Join our community of impact-driven DeFi enthusiasts.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {isSubscribed ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
            
            {isSubscribed && (
              <p className="text-green-400 mt-4 text-sm">
                Thank you for subscribing! Check your email for confirmation.
              </p>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-blue-400" />
                <div>
                  <h4 className="text-xl font-bold">Aegis</h4>
                  <p className="text-sm text-slate-400">Public Good Yield Optimizer</p>
                </div>
              </div>
              
              <p className="text-slate-400 mb-6 leading-relaxed">
                Transforming idle capital into sustainable public good funding. 
                Our revolutionary PGS system optimizes yield while maximizing social impact.
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </a>
                ))}
              </div>
              
              <Badge variant="secondary" className="gap-2 bg-blue-900/50 text-blue-200 border-blue-800">
                <Heart className="w-4 h-4" />
                Built for Public Goods
              </Badge>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-slate-100 mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group"
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-semibold text-slate-100 mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group"
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-slate-100 mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group"
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-slate-100 mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group"
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-slate-400 text-sm">
                © 2025 Aegis. All rights reserved.
              </p>
              <div className="flex items-center gap-1 text-slate-400 text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>for Public Goods</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1 border-green-800 text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Audited
                </Badge>
                <Badge variant="outline" className="gap-1 border-blue-800 text-blue-400">
                  <Shield className="w-3 h-3" />
                  Secure
                </Badge>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-slate-100 transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
    </footer>
  )
}