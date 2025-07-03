"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Phone, Bell, Shield, Save, X, Check, Camera, Crown, Book, Heart, Trophy, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface MockUser {
  id: string
  name: string
  email: string
  phone?: string
  location: string
  avatar?: number
  bio?: string
  stats: {
    booksListed: number
    impactScore: number
    communityRank: number
    booksRead: number
    level: string
    totalViews: number
    booksShared: number
    totalMessages: number
    currentStreak: number
  }
  achievements: string[]
}

// Simple auth hook mock for ProfileSettings
const useAuth = () => {
  const [user, setUser] = useState<MockUser | null>(null)

  useEffect(() => {
    // Get user from localStorage or API
    const mockUser: MockUser = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      location: "New York, NY",
      avatar: 1,
      bio: "Passionate reader and book enthusiast. Love sharing knowledge through books!",
      stats: {
        booksListed: 12,
        impactScore: 850,
        communityRank: 15,
        booksRead: 45,
        level: "Book Champion",
        totalViews: 1250,
        booksShared: 8,
        totalMessages: 156,
        currentStreak: 7,
      },
      achievements: ["First Book", "Community Helper", "Reading Streak"],
    }
    setUser(mockUser)
  }, [])

  const updateUser = (updatedUser: MockUser) => {
    setUser(updatedUser)
    // In real app, this would update the global state/context
  }

  return { user, updateUser }
}

interface ProfileSettingsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const avatarOptions = [
  { id: 1, emoji: "📚", name: "Book Lover", color: "from-blue-500 to-cyan-500" },
  { id: 2, emoji: "🤓", name: "Scholar", color: "from-green-500 to-emerald-500" },
  { id: 3, emoji: "📖", name: "Reader", color: "from-purple-500 to-pink-500" },
  { id: 4, emoji: "✍️", name: "Writer", color: "from-orange-500 to-red-500" },
  { id: 5, emoji: "🎭", name: "Drama Fan", color: "from-indigo-500 to-purple-500" },
  { id: 6, emoji: "🔬", name: "Sci-Fi Lover", color: "from-cyan-500 to-blue-500" },
  { id: 7, emoji: "🏰", name: "Fantasy Reader", color: "from-pink-500 to-rose-500" },
  { id: 8, emoji: "🕵️", name: "Mystery Solver", color: "from-gray-500 to-slate-500" },
  { id: 9, emoji: "💝", name: "Romance Reader", color: "from-rose-500 to-pink-500" },
  { id: 10, emoji: "🌟", name: "Bookworm", color: "from-yellow-500 to-orange-500" },
]

export function ProfileSettings({ open, onOpenChange }: ProfileSettingsProps) {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      publicProfile: true,
      showStats: true,
      showActivity: false,
    },
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
        privacy: {
          publicProfile: true,
          showStats: true,
          showActivity: false,
        },
      })
      setSelectedAvatar(user.avatar || 1)
    }
  }, [user])

  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "" }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    if (formData.phone && !/^\+?[\d\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }))
    setHasChanges(true)
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value },
    }))
    setHasChanges(true)
  }

  const handleAvatarChange = (avatarId: number) => {
    setSelectedAvatar(avatarId)
    setHasChanges(true)
  }

  const handleSave = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before saving.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (user) {
        updateUser({
          ...user,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          avatar: selectedAvatar,
        })
      }

      setHasChanges(false)
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
        privacy: {
          publicProfile: true,
          showStats: true,
          showActivity: false,
        },
      })
      setSelectedAvatar(user.avatar || 1)
    }
    setHasChanges(false)
    setErrors({ name: "", email: "", phone: "" })
    onOpenChange(false)
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-2xl">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <span>Profile Settings</span>
          </DialogTitle>
          <DialogDescription>Manage your account settings and preferences</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Left Column - Avatar & Stats */}
          <div className="space-y-6">
            {/* Avatar Selection */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Camera className="h-5 w-5 mr-2 text-blue-600" />
                Choose Avatar
              </h3>

              {/* Current Avatar Display */}
              <div className="text-center mb-6">
                <div
                  className={cn(
                    "w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-4xl shadow-lg bg-gradient-to-r",
                    avatarOptions.find((a) => a.id === selectedAvatar)?.color || "from-gray-400 to-gray-600",
                  )}
                >
                  {avatarOptions.find((a) => a.id === selectedAvatar)?.emoji}
                </div>
                <p className="mt-2 font-medium text-gray-900">
                  {avatarOptions.find((a) => a.id === selectedAvatar)?.name}
                </p>
              </div>

              {/* Avatar Options Grid */}
              <div className="grid grid-cols-5 gap-3">
                {avatarOptions.map((avatar) => (
                  <motion.button
                    key={avatar.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAvatarChange(avatar.id)}
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-200 bg-gradient-to-r",
                      avatar.color,
                      selectedAvatar === avatar.id
                        ? "ring-4 ring-blue-500 ring-offset-2 shadow-lg"
                        : "hover:shadow-md opacity-70 hover:opacity-100",
                    )}
                  >
                    {avatar.emoji}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* User Stats */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                Your Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">Impact Score</span>
                  </div>
                  <Badge variant="secondary">{user.stats.impactScore}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Book className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Books Listed</span>
                  </div>
                  <Badge variant="secondary">{user.stats.booksListed}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-sm text-gray-600">Books Shared</span>
                  </div>
                  <Badge variant="secondary">{user.stats.booksShared}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Crown className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm text-gray-600">Community Rank</span>
                  </div>
                  <Badge variant="secondary">#{user.stats.communityRank}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={cn(
                      "transition-all duration-200",
                      errors.name ? "border-red-500 focus:border-red-500" : "focus:border-blue-500",
                    )}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 flex items-center">
                      <X className="h-3 w-3 mr-1" />
                      {errors.name}
                    </p>
                  )}
                  {!errors.name && formData.name && (
                    <p className="text-sm text-green-600 flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      Looks good!
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={cn(
                        "pl-10 transition-all duration-200",
                        errors.email ? "border-red-500 focus:border-red-500" : "focus:border-blue-500",
                      )}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center">
                      <X className="h-3 w-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                  {!errors.email && formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                    <p className="text-sm text-green-600 flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      Valid email address
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number (Optional)
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={cn(
                        "pl-10 transition-all duration-200",
                        errors.phone ? "border-red-500 focus:border-red-500" : "focus:border-blue-500",
                      )}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-500 flex items-center">
                      <X className="h-3 w-3 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Notification Preferences */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-green-600" />
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-gray-600">Receive updates about your books and messages</div>
                  </div>
                  <Switch
                    checked={formData.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-sm text-gray-600">Get instant alerts on your device</div>
                  </div>
                  <Switch
                    checked={formData.notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-gray-600">Receive text messages for important updates</div>
                  </div>
                  <Switch
                    checked={formData.notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Privacy Settings */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-purple-600" />
                Privacy Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium">Public Profile</div>
                    <div className="text-sm text-gray-600">Allow others to view your profile and book collection</div>
                  </div>
                  <Switch
                    checked={formData.privacy.publicProfile}
                    onCheckedChange={(checked) => handlePrivacyChange("publicProfile", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium">Show Statistics</div>
                    <div className="text-sm text-gray-600">Display your reading stats and achievements</div>
                  </div>
                  <Switch
                    checked={formData.privacy.showStats}
                    onCheckedChange={(checked) => handlePrivacyChange("showStats", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium">Show Activity</div>
                    <div className="text-sm text-gray-600">Let others see your recent book activities</div>
                  </div>
                  <Switch
                    checked={formData.privacy.showActivity}
                    onCheckedChange={(checked) => handlePrivacyChange("showActivity", checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center space-x-2">
            {hasChanges && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center text-sm text-orange-600"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse" />
                You have unsaved changes
              </motion.div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
