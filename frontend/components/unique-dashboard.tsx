"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Book,
  Heart,
  Star,
  Trophy,
  Zap,
  Crown,
  Gift,
  MapPin,
  ArrowUp,
  Plus,
  Eye,
  MessageCircle,
  Target,
  Activity,
  BarChart3,
  Share2,
  Flame,
  Award,
  Calendar,
  Globe,
  Layers,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn, SlideInLeft, StaggerContainer, StaggerItem } from "./animated-elements"
import { cn } from "@/lib/utils"
import { mockCurrentUser } from "@/lib/mock-data"

interface DashboardStats {
  totalBooks: number
  booksShared: number
  totalDonations: number
  impactScore: number
  currentStreak: number
  level: string
  nextLevelProgress: number
  weeklyGrowth: number
  monthlyGrowth: number
  totalViews: number
  totalMessages: number
  communityRank: number
  booksRead: number
  favoriteGenre: string
  readingGoal: number
  readingProgress: number
}

const mockStats: DashboardStats = {
  totalBooks: mockCurrentUser.stats.booksListed,
  booksShared: mockCurrentUser.stats.booksShared,
  totalDonations: mockCurrentUser.stats.totalDonations,
  impactScore: mockCurrentUser.stats.impactScore,
  currentStreak: mockCurrentUser.stats.currentStreak,
  level: mockCurrentUser.stats.level,
  nextLevelProgress: 65,
  weeklyGrowth: 12,
  monthlyGrowth: 28,
  totalViews: mockCurrentUser.stats.totalViews,
  totalMessages: mockCurrentUser.stats.totalMessages,
  communityRank: mockCurrentUser.stats.communityRank,
  booksRead: mockCurrentUser.stats.booksRead,
  favoriteGenre: "Fiction",
  readingGoal: mockCurrentUser.stats.readingGoal,
  readingProgress: 46,
}

const achievements = [
  { name: "First Share", icon: Gift, unlocked: true, rarity: "common" },
  { name: "Book Lover", icon: Heart, unlocked: true, rarity: "common" },
  { name: "Community Star", icon: Star, unlocked: true, rarity: "rare" },
  { name: "Reading Streak", icon: Flame, unlocked: true, rarity: "epic" },
  { name: "Knowledge Master", icon: Crown, unlocked: false, rarity: "legendary" },
  { name: "Book Champion", icon: Trophy, unlocked: false, rarity: "legendary" },
]

const recentActivity = [
  { type: "share", book: "The Alchemist", user: "Sarah M.", time: "2h", icon: Share2, color: "blue" },
  { type: "view", book: "Clean Code", count: 12, time: "4h", icon: Eye, color: "green" },
  { type: "message", book: "Atomic Habits", user: "Raj P.", time: "6h", icon: MessageCircle, color: "purple" },
  { type: "like", book: "1984", count: 5, time: "1d", icon: Heart, color: "red" },
]

const levelColors = {
  common: "from-gray-400 to-gray-600",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-yellow-400 to-orange-500",
}

export function UniqueDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [animatedNumbers, setAnimatedNumbers] = useState({
    impactScore: 0,
    totalBooks: 0,
    communityRank: 0,
    currentStreak: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedNumbers({
        impactScore: mockStats.impactScore,
        totalBooks: mockStats.totalBooks,
        communityRank: mockStats.communityRank,
        currentStreak: mockStats.currentStreak,
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn>
        <div className="relative overflow-hidden">
          <div className="bg-white border rounded-2xl shadow-sm">
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                {/* Profile Section */}
                <SlideInLeft>
                  <div className="text-center lg:text-left">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, type: "spring" }}
                      className="relative w-24 h-24 mx-auto lg:mx-0 mb-4"
                    >
                      <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
                        <Book className="h-12 w-12 text-gray-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Crown className="h-4 w-4 text-white" />
                      </div>
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">{mockStats.level}</h2>
                    <p className="text-gray-600 mb-4">Book Enthusiast</p>
                    <div className="flex items-center justify-center lg:justify-start space-x-4">
                      <Badge variant="secondary">Level {Math.floor(mockStats.impactScore / 200) + 1}</Badge>
                      <Badge variant="outline">Top {Math.round((mockStats.communityRank / 1000) * 100)}%</Badge>
                    </div>
                  </div>
                </SlideInLeft>

                {/* Main Stats Grid */}
                <div className="lg:col-span-3">
                  <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        label: "Impact Score",
                        value: animatedNumbers.impactScore,
                        icon: Zap,
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                        suffix: "",
                      },
                      {
                        label: "Books Shared",
                        value: animatedNumbers.totalBooks,
                        icon: Book,
                        color: "text-green-600",
                        bg: "bg-green-50",
                        suffix: "",
                      },
                      {
                        label: "Community Rank",
                        value: animatedNumbers.communityRank,
                        icon: Trophy,
                        color: "text-purple-600",
                        bg: "bg-purple-50",
                        suffix: "",
                        prefix: "#",
                      },
                      {
                        label: "Reading Streak",
                        value: animatedNumbers.currentStreak,
                        icon: Flame,
                        color: "text-orange-600",
                        bg: "bg-orange-50",
                        suffix: " days",
                      },
                    ].map((stat, index) => (
                      <StaggerItem key={stat.label}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative group"
                        >
                          <div className="bg-white border rounded-xl p-6 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", stat.bg)}>
                                <stat.icon className={cn("h-6 w-6", stat.color)} />
                              </div>
                              <ArrowUp className="h-4 w-4 text-green-500" />
                            </div>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
                              className="text-2xl font-bold mb-1 text-gray-900"
                            >
                              {stat.prefix}
                              {stat.value.toLocaleString()}
                              {stat.suffix}
                            </motion.div>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                          </div>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Tab Navigation */}
      <FadeIn delay={0.2}>
        <div className="flex justify-center">
          <div className="bg-white rounded-xl p-2 shadow-sm border">
            <div className="flex space-x-2">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "achievements", label: "Achievements", icon: Award },
                { id: "activity", label: "Activity", icon: Activity },
                { id: "insights", label: "Insights", icon: Globe },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={selectedTab === tab.id ? "default" : "ghost"}
                  onClick={() => setSelectedTab(tab.id)}
                  className="rounded-lg"
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {selectedTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Reading Progress */}
            <Card className="lg:col-span-2 border shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Target className="h-6 w-6 text-blue-600 mr-3" />
                    Reading Journey 2024
                  </h3>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {Math.round((mockStats.booksRead / mockStats.readingGoal) * 100)}% Complete
                  </Badge>
                </div>

                {/* Circular Progress */}
                <div className="flex items-center justify-center mb-8">
                  <div className="relative w-64 h-64">
                    <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="35"
                        stroke="#3B82F6"
                        strokeWidth="6"
                        fill="transparent"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: mockStats.booksRead / mockStats.readingGoal }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        style={{
                          strokeDasharray: "219.8",
                          strokeDashoffset: "219.8",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="text-center"
                      >
                        <div className="text-5xl font-bold text-gray-900 mb-2">{mockStats.booksRead}</div>
                        <div className="text-lg text-gray-600">of {mockStats.readingGoal}</div>
                        <div className="text-sm text-blue-600 font-semibold">Books Read</div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Progress Details */}
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {mockStats.readingGoal - mockStats.booksRead}
                    </div>
                    <div className="text-sm text-gray-600">Books Left</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-600">{mockStats.favoriteGenre}</div>
                    <div className="text-sm text-gray-600">Favorite Genre</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600">+{mockStats.monthlyGrowth}%</div>
                    <div className="text-sm text-gray-600">This Month</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Layers className="h-5 w-5 text-blue-600 mr-2" />
                    Quick Actions
                  </h3>

                  <div className="space-y-4">
                    {[
                      { name: "List New Book", icon: Plus, color: "bg-blue-600 hover:bg-blue-700" },
                      { name: "Find Books", icon: MapPin, color: "bg-green-600 hover:bg-green-700" },
                      { name: "View Messages", icon: MessageCircle, color: "bg-purple-600 hover:bg-purple-700" },
                      { name: "Check Analytics", icon: BarChart3, color: "bg-orange-600 hover:bg-orange-700" },
                    ].map((action, index) => (
                      <motion.div
                        key={action.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className={cn("w-full justify-start text-white", action.color)}>
                          <action.icon className="h-4 w-4 mr-3" />
                          {action.name}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Level Progress */}
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Crown className="h-5 w-5 text-yellow-600 mr-2" />
                    Level Progress
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Next Level</span>
                      <span className="text-sm text-gray-500">{mockStats.nextLevelProgress}%</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${mockStats.nextLevelProgress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-blue-600 rounded-full"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {100 - mockStats.nextLevelProgress}% more to reach <strong>Book Champion</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {selectedTab === "achievements" && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <Award className="h-6 w-6 text-yellow-600 mr-3" />
                  Achievement Gallery
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center group cursor-pointer"
                    >
                      <div
                        className={cn(
                          "w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-300",
                          achievement.unlocked
                            ? `bg-gradient-to-r ${levelColors[achievement.rarity]} group-hover:shadow-xl`
                            : "bg-gray-200 grayscale",
                        )}
                      >
                        <achievement.icon
                          className={cn(
                            "h-10 w-10 transition-all duration-300",
                            achievement.unlocked ? "text-white group-hover:scale-110" : "text-gray-400",
                          )}
                        />
                      </div>
                      <h4
                        className={cn("font-semibold mb-1", achievement.unlocked ? "text-gray-900" : "text-gray-400")}
                      >
                        {achievement.name}
                      </h4>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          achievement.rarity === "common" && "border-gray-300 text-gray-600",
                          achievement.rarity === "rare" && "border-blue-300 text-blue-600",
                          achievement.rarity === "epic" && "border-purple-300 text-purple-600",
                          achievement.rarity === "legendary" && "border-yellow-300 text-yellow-600",
                        )}
                      >
                        {achievement.rarity}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {selectedTab === "activity" && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <Activity className="h-6 w-6 text-blue-600 mr-3" />
                  Recent Activity
                </h3>

                <div className="space-y-6">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-6 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                    >
                      <div
                        className={cn(
                          "w-16 h-16 rounded-xl flex items-center justify-center",
                          activity.color === "blue" && "bg-blue-100 text-blue-600",
                          activity.color === "green" && "bg-green-100 text-green-600",
                          activity.color === "purple" && "bg-purple-100 text-purple-600",
                          activity.color === "red" && "bg-red-100 text-red-600",
                        )}
                      >
                        <activity.icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-1">{activity.book}</h4>
                        <p className="text-gray-600">
                          {activity.type === "share" && `Shared with ${activity.user}`}
                          {activity.type === "view" && `Received ${activity.count} new views`}
                          {activity.type === "message" && `New message from ${activity.user}`}
                          {activity.type === "like" && `Received ${activity.count} new likes`}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          {activity.time} ago
                        </Badge>
                        <p className="text-sm text-gray-500 capitalize">{activity.type}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {selectedTab === "insights" && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <Card className="border shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
                  Community Impact
                </h3>

                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{mockStats.totalViews}</div>
                    <p className="text-gray-600">Total Profile Views</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{mockStats.booksShared}</div>
                    <p className="text-gray-600">Books Shared</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{mockStats.totalMessages}</div>
                    <p className="text-gray-600">Messages Exchanged</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calendar className="h-5 w-5 text-green-600 mr-2" />
                  Monthly Growth
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Books Listed</span>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-green-600">+{mockStats.weeklyGrowth}%</span>
                      <ArrowUp className="h-4 w-4 text-green-500 ml-1" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Profile Views</span>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-blue-600">+{mockStats.monthlyGrowth}%</span>
                      <ArrowUp className="h-4 w-4 text-blue-500 ml-1" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Community Engagement</span>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-purple-600">+15%</span>
                      <ArrowUp className="h-4 w-4 text-purple-500 ml-1" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
