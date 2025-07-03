"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Book,
  Users,
  MapPin,
  Heart,
  Star,
  ArrowRight,
  Search,
  BookOpen,
  Shield,
  TrendingUp,
  Coffee,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  StaggerItem,
  FloatingElement,
} from "@/components/animated-elements"
import { AnimatedFooter } from "@/components/animated-footer"
import { DonorRecognition } from "@/components/donor-recognition"
import { UniqueDashboard } from "@/components/unique-dashboard"
import { useAuth } from "@/components/auth-provider"

const stats = [
  { label: "Books Shared", value: "10,000+", icon: Book, color: "text-blue-600" },
  { label: "Active Members", value: "2,500+", icon: Users, color: "text-green-600" },
  { label: "Cities Connected", value: "150+", icon: MapPin, color: "text-purple-600" },
  { label: "Stories Exchanged", value: "25,000+", icon: Heart, color: "text-red-600" },
]

const features = [
  {
    title: "Smart Discovery",
    description: "Find books near you with our intelligent location-based search",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Community Driven",
    description: "Connect with fellow book lovers and build lasting friendships",
    icon: Users,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Secure Exchange",
    description: "Safe and verified book exchanges with trusted community members",
    icon: Shield,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Impact Tracking",
    description: "See your reading impact and contribution to the community",
    icon: TrendingUp,
    color: "from-orange-500 to-red-500",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Book Enthusiast",
    content: "BookBridge has transformed how I discover new reads. I've found amazing books and made great friends!",
    avatar: "SJ",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Literature Teacher",
    content: "Perfect platform for sharing educational resources with my students and fellow educators.",
    avatar: "MC",
    rating: 5,
  },
  {
    name: "Emma Davis",
    role: "Community Organizer",
    content: "The community aspect is incredible. We've organized several book clubs through this platform.",
    avatar: "ED",
    rating: 5,
  },
]

export default function HomePage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  if (user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <UniqueDashboard />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingElement>
            <div className="absolute top-20 left-10 opacity-20">
              <Book className="h-16 w-16 text-orange-500" />
            </div>
          </FloatingElement>
          <FloatingElement>
            <div className="absolute top-40 right-20 opacity-15">
              <BookOpen className="h-20 w-20 text-red-500" />
            </div>
          </FloatingElement>
          <FloatingElement>
            <div className="absolute bottom-40 left-20 opacity-10">
              <Coffee className="h-12 w-12 text-orange-600" />
            </div>
          </FloatingElement>
          <FloatingElement>
            <div className="absolute bottom-20 right-10 opacity-20">
              <Sparkles className="h-14 w-14 text-pink-500" />
            </div>
          </FloatingElement>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SlideInLeft>
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200">🚀 Join 10,000+ Book Lovers</Badge>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Share Books,{" "}
                    <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Build Community
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Connect with fellow book lovers, discover new stories, and create meaningful exchanges in your local
                    community.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/auth">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 text-lg"
                    >
                      Start Sharing
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/discover">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-orange-200 text-orange-700 hover:bg-orange-50 px-8 py-3 text-lg bg-transparent"
                    >
                      Explore Books
                    </Button>
                  </Link>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search for books, authors, or genres..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 text-lg border-2 border-orange-100 focus:border-orange-300 rounded-xl"
                  />
                </div>
              </div>
            </SlideInLeft>

            <SlideInRight>
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative z-10"
                >
                  <img
                    src="/placeholder.svg?height=600&width=500&text=📚+Community"
                    alt="Book Community"
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">2,500+</div>
                      <div className="text-sm text-gray-600">Active Members</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Book className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">10K+</div>
                      <div className="text-sm text-gray-600">Books Shared</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Building the World's Largest Book Community</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of book lovers who are already sharing, discovering, and connecting through the power of
                literature.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={stat.label}>
                <motion.div whileHover={{ scale: 1.05, y: -5 }} className="text-center group cursor-pointer">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                    <stat.icon className={`h-10 w-10 ${stat.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BookBridge?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We've built the perfect platform for book lovers to connect, share, and discover new stories together.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={feature.title}>
                <motion.div whileHover={{ y: -10 }} className="group">
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real stories from real book lovers who've found their community through BookBridge.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={testimonial.name}>
                <motion.div whileHover={{ scale: 1.02 }} className="group">
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-600">{testimonial.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Start Your Book Journey?</h2>
              <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                Join our growing community of book lovers and start sharing your favorite stories today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button
                    size="lg"
                    className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                  >
                    Join BookBridge
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/discover">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg bg-transparent"
                  >
                    Browse Books
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <DonorRecognition />
      <AnimatedFooter />
    </div>
  )
}
