"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Book, Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { SlideInLeft, SlideInRight, FloatingElement } from "@/components/animated-elements"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { login, register } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const validateForm = (isSignUp: boolean) => {
    const newErrors = { name: "", email: "", password: "" }
    let isValid = true

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (type: "signin" | "signup") => {
    if (!validateForm(type === "signup")) return

    setIsLoading(true)

    try {
      let success = false

      if (type === "signin") {
        success = await login(formData.email, formData.password)
      } else {
        success = await register(formData.name, formData.email, formData.password)
      }

      if (success) {
        toast({
          title: type === "signin" ? "Welcome back!" : "Account created!",
          description:
            type === "signin" ? "You've successfully signed in to BookBridge." : "Welcome to the BookBridge community!",
        })
        router.push("/")
      } else {
        toast({
          title: "Authentication failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement>
          <div className="absolute top-20 left-10 opacity-10">
            <Book className="h-24 w-24 text-orange-500" />
          </div>
        </FloatingElement>
        <FloatingElement>
          <div className="absolute top-40 right-20 opacity-10">
            <Sparkles className="h-32 w-32 text-red-500" />
          </div>
        </FloatingElement>
        <FloatingElement>
          <div className="absolute bottom-40 left-20 opacity-10">
            <Book className="h-20 w-20 text-pink-500" />
          </div>
        </FloatingElement>
        <FloatingElement>
          <div className="absolute bottom-20 right-10 opacity-10">
            <Sparkles className="h-28 w-28 text-orange-600" />
          </div>
        </FloatingElement>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Branding */}
        <SlideInLeft>
          <div className="text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start space-x-4"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Book className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                BookBridge
              </h1>
            </motion.div>

            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Connect Through
                <span className="block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Stories
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Join thousands of book lovers sharing stories, discovering new reads, and building meaningful
                connections in their communities.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-4">
              {[
                "📚 Share your favorite books with neighbors",
                "🔍 Discover new stories near you",
                "🤝 Build lasting friendships through literature",
                "🏆 Track your reading impact and achievements",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-3 text-gray-700"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { label: "Books Shared", value: "10K+" },
                { label: "Active Users", value: "2.5K+" },
                { label: "Cities", value: "150+" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </SlideInLeft>

        {/* Right Side - Auth Form */}
        <SlideInRight>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">Welcome to BookBridge</CardTitle>
                <CardDescription className="text-gray-600">
                  Sign in to your account or create a new one to get started
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="signin" className="text-sm">
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="text-sm">
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin" className="space-y-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key="signin"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="signin-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="signin-email"
                              type="email"
                              placeholder="Enter your email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                            />
                          </div>
                          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signin-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="signin-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              value={formData.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                        </div>

                        <Button
                          onClick={() => handleSubmit("signin")}
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3"
                        >
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                          ) : (
                            <ArrowRight className="w-4 h-4 mr-2" />
                          )}
                          {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                      </motion.div>
                    </AnimatePresence>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key="signup"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="signup-name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="signup-name"
                              type="text"
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                            />
                          </div>
                          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="signup-email"
                              type="email"
                              placeholder="Enter your email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                            />
                          </div>
                          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="signup-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password"
                              value={formData.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                        </div>

                        <Button
                          onClick={() => handleSubmit("signup")}
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3"
                        >
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                          ) : (
                            <ArrowRight className="w-4 h-4 mr-2" />
                          )}
                          {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>
                      </motion.div>
                    </AnimatePresence>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    By continuing, you agree to our{" "}
                    <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </SlideInRight>
      </div>
    </div>
  )
}
