"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Book,
  Heart,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Send,
  Star,
  Users,
  Award,
  Sparkles,
  ArrowUp,
} from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FadeIn, SlideInLeft, SlideInRight, FloatingElement } from "./animated-elements"

const footerLinks = {
  platform: [
    { name: "Discover Books", href: "/discover" },
    { name: "List a Book", href: "/list-book" },
    { name: "Book Map", href: "/map" },
    { name: "My Library", href: "/library" },
  ],
  community: [
    { name: "About Us", href: "/about" },
    { name: "Community Guidelines", href: "/guidelines" },
    { name: "Success Stories", href: "/stories" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Safety Tips", href: "/safety" },
    { name: "Report Issue", href: "/report" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Accessibility", href: "/accessibility" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-500" },
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-600" },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-700" },
  { name: "GitHub", icon: Github, href: "#", color: "hover:text-gray-900" },
]

const stats = [
  { label: "Books Shared", value: "50K+", icon: Book },
  { label: "Happy Users", value: "12K+", icon: Users },
  { label: "Communities", value: "150+", icon: MapPin },
  { label: "Success Stories", value: "2K+", icon: Award },
]

export function AnimatedFooter() {
  const [email, setEmail] = useState("")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -50])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement className="absolute top-20 left-10">
          <div className="w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
        </FloatingElement>
        <FloatingElement className="absolute top-40 right-20">
          <div className="w-48 h-48 bg-purple-400/10 rounded-full blur-3xl" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-20 left-1/3">
          <div className="w-24 h-24 bg-pink-400/10 rounded-full blur-xl" />
        </FloatingElement>

        {/* Animated Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Stats Section */}
        <FadeIn>
          <div className="border-b border-white/10 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6"
                >
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold">Community Impact</span>
                </motion.div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Building a Better World
                  <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    One Book at a Time
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="text-center group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-shadow"
                    >
                      <stat.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                      className="text-3xl font-bold mb-2"
                    >
                      {stat.value}
                    </motion.div>
                    <p className="text-gray-300">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Brand Section */}
              <SlideInLeft className="lg:col-span-2">
                <div className="space-y-6">
                  <Link href="/" className="flex items-center space-x-3 group">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-xl"
                    >
                      <Book className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <span className="text-2xl font-bold">BookBridge</span>
                      <p className="text-sm text-gray-300">Community Exchange</p>
                    </div>
                  </Link>

                  <p className="text-gray-300 leading-relaxed max-w-md">
                    Connecting book lovers worldwide through sharing, exchanging, and discovering amazing stories. Join
                    our community and make reading accessible for everyone.
                  </p>

                  {/* Newsletter Signup */}
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-blue-400" />
                      Stay Updated
                    </h4>
                    <div className="flex space-x-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                      />
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                          <Send className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                    <p className="text-xs text-gray-400">Get weekly updates on new books and community highlights</p>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Follow Us</h4>
                    <div className="flex space-x-4">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={social.name}
                          href={social.href}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.2, y: -2 }}
                          className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center transition-colors ${social.color}`}
                        >
                          <social.icon className="h-5 w-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </SlideInLeft>

              {/* Links Sections */}
              {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 + 0.2 }}
                  className="space-y-4"
                >
                  <h4 className="font-semibold text-lg capitalize flex items-center">
                    {category === "platform" && <Book className="h-4 w-4 mr-2 text-blue-400" />}
                    {category === "community" && <Users className="h-4 w-4 mr-2 text-green-400" />}
                    {category === "support" && <Heart className="h-4 w-4 mr-2 text-pink-400" />}
                    {category === "legal" && <Star className="h-4 w-4 mr-2 text-yellow-400" />}
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: categoryIndex * 0.1 + linkIndex * 0.05 + 0.3 }}
                      >
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors hover:underline"
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <SlideInLeft>
                <div className="flex items-center space-x-4">
                  <p className="text-gray-300">
                    © 2024 BookBridge. Made with{" "}
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      className="inline-block"
                    >
                      <Heart className="h-4 w-4 text-red-400 inline" />
                    </motion.span>{" "}
                    for book lovers
                  </p>
                </div>
              </SlideInLeft>

              <SlideInRight>
                <div className="flex items-center space-x-6">
                  <Badge className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    All systems operational
                  </Badge>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>Serving 150+ cities worldwide</span>
                  </div>
                </div>
              </SlideInRight>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="h-5 w-5 text-white" />
      </motion.button>
    </footer>
  )
}
