"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Award, Crown, Star, Heart, Trophy, Sparkles, Users, BookOpen, Target } from "lucide-react"
import { cn } from "@/lib/utils"

interface DonorStats {
  id: string
  name: string
  avatar?: string
  totalDonations: number
  booksShared: number
  impactScore: number
  joinedDate: string
  badges: string[]
  currentStreak: number
  location: string
}

const mockTopDonors: DonorStats[] = [
  {
    id: "1",
    name: "Sarah Wilson",
    totalDonations: 47,
    booksShared: 52,
    impactScore: 2340,
    joinedDate: "2023-01-15",
    badges: ["Book Champion", "Community Hero", "Knowledge Spreader"],
    currentStreak: 12,
    location: "Mumbai, Maharashtra",
  },
  {
    id: "2",
    name: "Raj Patel",
    totalDonations: 38,
    booksShared: 41,
    impactScore: 1890,
    joinedDate: "2023-03-22",
    badges: ["Generous Giver", "Reading Advocate"],
    currentStreak: 8,
    location: "Bangalore, Karnataka",
  },
  {
    id: "3",
    name: "Priya Sharma",
    totalDonations: 31,
    booksShared: 35,
    impactScore: 1560,
    joinedDate: "2023-02-10",
    badges: ["Book Lover", "Community Builder"],
    currentStreak: 15,
    location: "Delhi, NCR",
  },
]

const achievementLevels = [
  { name: "Book Buddy", min: 0, max: 5, color: "from-gray-400 to-gray-500", icon: BookOpen },
  { name: "Reading Advocate", min: 6, max: 15, color: "from-blue-400 to-blue-500", icon: Users },
  { name: "Knowledge Spreader", min: 16, max: 30, color: "from-green-400 to-green-500", icon: Sparkles },
  { name: "Community Hero", min: 31, max: 50, color: "from-purple-400 to-purple-500", icon: Heart },
  { name: "Book Champion", min: 51, max: 100, color: "from-yellow-400 to-orange-500", icon: Trophy },
  { name: "Legend", min: 101, max: Number.POSITIVE_INFINITY, color: "from-pink-400 to-red-500", icon: Crown },
]

function getDonorLevel(donations: number) {
  return achievementLevels.find((level) => donations >= level.min && donations <= level.max) || achievementLevels[0]
}

function DonorCard({ donor, rank }: { donor: DonorStats; rank: number }) {
  const level = getDonorLevel(donor.totalDonations)
  const nextLevel = achievementLevels.find((l) => l.min > donor.totalDonations)
  const progress = nextLevel ? ((donor.totalDonations - level.min) / (nextLevel.min - level.min)) * 100 : 100

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        rank === 1 && "ring-2 ring-yellow-400 shadow-lg",
        rank === 2 && "ring-2 ring-gray-400",
        rank === 3 && "ring-2 ring-orange-400",
      )}
    >
      {/* Rank Badge */}
      <div
        className={cn(
          "absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg",
          rank === 1 && "bg-gradient-to-r from-yellow-400 to-yellow-500",
          rank === 2 && "bg-gradient-to-r from-gray-400 to-gray-500",
          rank === 3 && "bg-gradient-to-r from-orange-400 to-orange-500",
          rank > 3 && "bg-gradient-to-r from-blue-400 to-blue-500",
        )}
      >
        {rank === 1 ? <Crown className="h-4 w-4" /> : rank}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className={cn("w-full h-full bg-gradient-to-br", level.color)} />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
              <AvatarImage src={donor.avatar || "/placeholder.svg"} alt={donor.name} />
              <AvatarFallback className={cn("text-white font-bold bg-gradient-to-br", level.color)}>
                {donor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-lg bg-gradient-to-r",
                level.color,
              )}
            >
              <level.icon className="h-3 w-3" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900">{donor.name}</h3>
            <p className="text-sm text-gray-600">{donor.location}</p>
            <Badge className={cn("mt-1 text-white bg-gradient-to-r", level.color)}>{level.name}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{donor.totalDonations}</div>
            <div className="text-xs text-gray-500">Donations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{donor.booksShared}</div>
            <div className="text-xs text-gray-500">Books Shared</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{donor.impactScore}</div>
            <div className="text-xs text-gray-500">Impact Score</div>
          </div>
        </div>

        {/* Progress to Next Level */}
        {nextLevel && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress to {nextLevel.name}</span>
              <span className="font-medium">
                {donor.totalDonations}/{nextLevel.min}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          {donor.badges.slice(0, 2).map((badge, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {badge}
            </Badge>
          ))}
          {donor.badges.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{donor.badges.length - 2} more
            </Badge>
          )}
        </div>

        {/* Streak */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-orange-600">
            <Target className="h-4 w-4" />
            <span className="font-medium">{donor.currentStreak} day streak</span>
          </div>
          <div className="text-gray-500">Since {new Date(donor.joinedDate).toLocaleDateString()}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DonorRecognition() {
  const [viewMode, setViewMode] = useState<"leaderboard" | "achievements">("leaderboard")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-full">
          <Trophy className="h-5 w-5 text-yellow-600" />
          <span className="font-semibold text-yellow-800">Community Champions</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Celebrating Our Top Donors</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Recognizing the amazing community members who make book sharing possible through their generous contributions
        </p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg">
          <Button
            variant={viewMode === "leaderboard" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("leaderboard")}
            className={viewMode === "leaderboard" ? "bg-white shadow-sm" : ""}
          >
            <Trophy className="h-4 w-4 mr-2" />
            Leaderboard
          </Button>
          <Button
            variant={viewMode === "achievements" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("achievements")}
            className={viewMode === "achievements" ? "bg-white shadow-sm" : ""}
          >
            <Award className="h-4 w-4 mr-2" />
            Achievements
          </Button>
        </div>
      </div>

      {viewMode === "leaderboard" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTopDonors.map((donor, index) => (
            <DonorCard key={donor.id} donor={donor} rank={index + 1} />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementLevels.map((level, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className={cn("absolute inset-0 opacity-10 bg-gradient-to-br", level.color)} />
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={cn("p-3 rounded-xl bg-gradient-to-r text-white shadow-lg", level.color)}>
                    <level.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{level.name}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {level.max === Number.POSITIVE_INFINITY
                        ? `${level.min}+ donations`
                        : `${level.min}-${level.max} donations`}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    Unlock exclusive benefits and recognition in the community
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Special badge and profile highlight</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
