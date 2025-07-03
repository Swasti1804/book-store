"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Book,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  X,
  Award,
  User,
  TrendingUp,
  Activity,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { ProfileSettings } from "@/components/profile-settings"

// Mock data types
interface MockBook {
  id: string
  title: string
  author: string
  images: string[]
  status: "available" | "borrowed" | "sold" | "exchanged"
  views: number
  createdAt: Date
}

interface MockRequest {
  id: string
  bookTitle: string
  requesterName: string
  message: string
  status: "pending" | "accepted" | "rejected"
  createdAt: Date
}

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

// Mock data
const mockCurrentUser: MockUser = {
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

const mockUserBooks: MockBook[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    images: ["/placeholder.svg?height=200&width=300&text=Book"],
    status: "available",
    views: 45,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    images: ["/placeholder.svg?height=200&width=300&text=Book"],
    status: "exchanged",
    views: 32,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    images: ["/placeholder.svg?height=200&width=300&text=Book"],
    status: "sold",
    views: 28,
    createdAt: new Date("2024-01-08"),
  },
]

const mockReceivedRequests: MockRequest[] = [
  {
    id: "1",
    bookTitle: "The Great Gatsby",
    requesterName: "Alice Smith",
    message: "Hi! I'd love to borrow this book for my literature class. I'll take good care of it!",
    status: "pending",
    createdAt: new Date("2024-01-20"),
  },
]

// Enhanced auth hook mock with updateUser function
const useAuth = () => {
  const [user, setUser] = useState<MockUser | null>(null)

  useEffect(() => {
    // Simulate auth check
    setTimeout(() => {
      setUser(mockCurrentUser)
    }, 500)
  }, [])

  const updateUser = (updatedUser: MockUser) => {
    setUser(updatedUser)
  }

  return { user, updateUser }
}

// Animation components
const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) => (
  <div className={cn("animate-in fade-in duration-500", className)} style={{ animationDelay: `${delay}s` }}>
    {children}
  </div>
)

const ScaleIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) => (
  <div className="animate-in zoom-in duration-300" style={{ animationDelay: `${delay}s` }}>
    {children}
  </div>
)

const StaggerContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => <div className={className}>{children}</div>

const StaggerItem = ({ children }: { children: React.ReactNode }) => <div>{children}</div>

// Contact Modal Component
const ContactModal = ({
  isOpen,
  onClose,
  book,
  onSendMessage,
}: {
  isOpen: boolean
  onClose: () => void
  book: MockBook | null
  onSendMessage: (message: string, contactInfo: string) => void
}) => {
  const [message, setMessage] = useState("")
  const [contactInfo, setContactInfo] = useState("")
  const [messageType, setMessageType] = useState<"exchange" | "buy">("exchange")

  if (!isOpen || !book) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && contactInfo.trim()) {
      onSendMessage(message, contactInfo)
      setMessage("")
      setContactInfo("")
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Contact Book Owner</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
            <h3 className="font-bold text-lg text-gray-900 mb-2">{book.title}</h3>
            <p className="text-gray-600">by {book.author}</p>
            <Badge className={cn("mt-2", getStatusColor(book.status))}>{book.status}</Badge>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interest Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="exchange"
                    checked={messageType === "exchange"}
                    onChange={(e) => setMessageType(e.target.value as "exchange" | "buy")}
                    className="mr-2"
                  />
                  Exchange
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="buy"
                    checked={messageType === "buy"}
                    onChange={(e) => setMessageType(e.target.value as "exchange" | "buy")}
                    className="mr-2"
                  />
                  Buy
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-2">
                Your Contact Information
              </label>
              <input
                type="text"
                id="contactInfo"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="Phone number or email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Hi! I'm interested in ${messageType === "exchange" ? "exchanging" : "buying"} your book "${book.title}". Please let me know if it's still available.`}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Send Message
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// Unique Dashboard Component
const UniqueDashboard = () => (
  <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-indigo-50 mb-8">
    <CardContent className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
          <p className="text-gray-600">Books Listed</p>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-green-600 mb-2">8</div>
          <p className="text-gray-600">Books Shared</p>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-purple-600 mb-2">850</div>
          <p className="text-gray-600">Impact Score</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Donor Recognition Component
const DonorRecognition = () => (
  <Card className="border-0 shadow-xl">
    <CardContent className="p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Award className="h-6 w-6 text-yellow-600 mr-3" />
        Your Achievements
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCurrentUser.achievements.map((achievement, index) => (
          <div key={index} className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-bold text-lg text-gray-900 mb-2">{achievement}</h4>
            <p className="text-gray-600 text-sm">Achievement unlocked!</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

// Animated Footer Component
const AnimatedFooter = () => (
  <footer className="bg-gray-900 text-white py-12 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">BookShare Community</h3>
        <p className="text-gray-400 mb-6">Connecting readers, sharing knowledge</p>
        <div className="flex justify-center space-x-6">
          <Button variant="ghost" className="text-white hover:text-orange-400">
            About
          </Button>
          <Button variant="ghost" className="text-white hover:text-orange-400">
            Contact
          </Button>
          <Button variant="ghost" className="text-white hover:text-orange-400">
            Privacy
          </Button>
        </div>
      </div>
    </div>
  </footer>
)

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800 border-green-200"
    case "borrowed":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "sold":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "exchanged":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getRequestStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "accepted":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// Avatar options for display
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

export default function LibraryPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [myBooks, setMyBooks] = useState<MockBook[]>([])
  const [receivedRequests, setReceivedRequests] = useState<MockRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [showProfileSettings, setShowProfileSettings] = useState(false)

  const [showContactModal, setShowContactModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState<MockBook | null>(null)
  const [contactMessages, setContactMessages] = useState<any[]>([])

  // Get tab from URL params or default to overview
  const defaultTab = searchParams.get("tab") || "overview"
  const [activeTab, setActiveTab] = useState(defaultTab)

  useEffect(() => {
    if (!user) return

    setTimeout(() => {
      setMyBooks(mockUserBooks)
      setReceivedRequests(mockReceivedRequests)
      setLoading(false)
    }, 1000)
  }, [user])

  // Update tab when URL changes
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleDeleteBook = async (bookId: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setMyBooks((prev) => prev.filter((book) => book.id !== bookId))
      toast({
        title: "Success",
        description: "Book deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete book",
        variant: "destructive",
      })
    }
  }

  const handleRequestAction = async (requestId: string, action: "accept" | "reject") => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setReceivedRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: action === "accept" ? "accepted" : "rejected" } : req,
        ),
      )
      toast({
        title: "Success",
        description: `Request ${action}ed successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action} request`,
        variant: "destructive",
      })
    }
  }

  const handleContactMessage = async (message: string, contactInfo: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newMessage = {
        id: Date.now().toString(),
        bookId: selectedBook?.id,
        bookTitle: selectedBook?.title,
        message,
        contactInfo,
        senderName: "Interested Reader", // In real app, this would be current user
        createdAt: new Date(),
        status: "new",
      }

      setContactMessages((prev) => [...prev, newMessage])

      toast({
        title: "Message Sent!",
        description: "Your message has been sent to the book owner. They will contact you soon!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleContactBook = (book: MockBook) => {
    setSelectedBook(book)
    setShowContactModal(true)
  }

  // Get current user avatar
  const getCurrentUserAvatar = () => {
    const avatar = avatarOptions.find((a) => a.id === (user?.avatar || 1))
    return avatar || avatarOptions[0]
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <FadeIn>
          <Card className="w-full max-w-md text-center border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Book className="h-12 w-12 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Please sign in</h2>
              <p className="text-gray-600 mb-6">You need to be signed in to view your library.</p>
              <Button asChild className="bg-orange-500 hover:bg-orange-600 shadow-lg">
                <Link href="/auth">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-32 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const currentAvatar = getCurrentUserAvatar()

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Profile Header */}
          <FadeIn>
            <Card className="mb-8 border-0 shadow-2xl bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                  {/* Profile Picture & Basic Info */}
                  <div className="text-center lg:text-left">
                    <div className="relative w-32 h-32 mx-auto lg:mx-0 mb-4">
                      <div
                        className={cn(
                          "w-full h-full rounded-3xl shadow-2xl ring-4 ring-white/20 flex items-center justify-center text-6xl bg-gradient-to-r",
                          currentAvatar.color,
                        )}
                      >
                        {currentAvatar.emoji}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center ring-4 ring-white">
                        <span className="text-white text-sm">📚</span>
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                    <p className="text-purple-200 mb-1">{user.email}</p>
                    {user.phone && <p className="text-purple-200 mb-1">{user.phone}</p>}
                    <p className="text-purple-200 mb-4">{user.location}</p>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg px-4 py-2">
                      {user.stats.level}
                    </Badge>
                    <div className="mt-4">
                      <Button
                        onClick={() => setShowProfileSettings(true)}
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        label: "Books Listed",
                        value: user.stats.booksListed,
                        icon: Book,
                        color: "from-blue-400 to-cyan-500",
                      },
                      {
                        label: "Impact Score",
                        value: user.stats.impactScore,
                        icon: TrendingUp,
                        color: "from-green-400 to-emerald-500",
                      },
                      {
                        label: "Community Rank",
                        value: `#${user.stats.communityRank}`,
                        icon: Award,
                        color: "from-purple-400 to-pink-500",
                      },
                      {
                        label: "Books Read",
                        value: user.stats.booksRead,
                        icon: User,
                        color: "from-orange-400 to-red-500",
                      },
                    ].map((stat, index) => (
                      <div key={stat.label} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center mx-auto mb-3",
                            stat.color,
                          )}
                        >
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-sm text-purple-200">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                {user.bio && (
                  <div className="mt-6 p-4 bg-white/10 rounded-xl">
                    <p className="text-purple-100">{user.bio}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </FadeIn>

          {/* Unique Dashboard */}
          <FadeIn delay={0.2}>
            <UniqueDashboard />
          </FadeIn>

          {/* Main Content Tabs */}
          <div className="mt-12">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <FadeIn delay={0.4}>
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 bg-white shadow-xl border-0 h-16 rounded-2xl">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl font-medium"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="my-books"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl font-medium"
                  >
                    My Books ({myBooks.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="received-requests"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-xl font-medium"
                  >
                    Requests ({receivedRequests.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="achievements"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-xl font-medium"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Achievements
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-xl font-medium"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Activity
                  </TabsTrigger>
                  <TabsTrigger
                    value="insights"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl font-medium"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Insights
                  </TabsTrigger>
                  <TabsTrigger
                    value="messages"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white rounded-xl font-medium"
                  >
                    Messages ({contactMessages.length})
                  </TabsTrigger>
                </TabsList>
              </FadeIn>

              <TabsContent value="overview">
                <FadeIn>
                  <UniqueDashboard />
                </FadeIn>
              </TabsContent>

              <TabsContent value="my-books">
                {myBooks.length === 0 ? (
                  <FadeIn>
                    <Card className="text-center py-16 border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50">
                      <CardContent>
                        <div className="mb-8">
                          <img
                            src="/placeholder.svg?height=200&width=300&text=📚✨📖💫"
                            alt="No Books"
                            className="w-64 h-32 mx-auto rounded-2xl shadow-lg object-cover"
                          />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">No books listed yet</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                          Start building your library by listing your first book. It will automatically appear on the
                          discover page for others to find!
                        </p>
                        <Button
                          asChild
                          size="lg"
                          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-xl text-lg px-8 py-4"
                        >
                          <Link href="/list-book">
                            <Plus className="mr-2 h-6 w-6" />
                            List Your First Book
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </FadeIn>
                ) : (
                  <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myBooks.map((book, index) => (
                      <StaggerItem key={book.id}>
                        <ScaleIn delay={index * 0.1}>
                          <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-xl overflow-hidden bg-gradient-to-br from-white to-gray-50">
                            <div className="relative overflow-hidden">
                              <img
                                src={book.images[0] || "/placeholder.svg?height=200&width=300"}
                                alt={book.title}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="absolute top-4 right-4">
                                <Badge className={cn("shadow-lg backdrop-blur-sm", getStatusColor(book.status))}>
                                  {book.status}
                                </Badge>
                              </div>
                            </div>
                            <CardContent className="p-6">
                              <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                {book.title}
                              </h3>
                              <p className="text-gray-600 mb-4 text-lg">by {book.author}</p>
                              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                                <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                                  <Eye className="h-4 w-4 mr-1" />
                                  {book.views} views
                                </span>
                                <span className="bg-gray-100 px-3 py-1 rounded-full">
                                  {book.createdAt.toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  asChild
                                  className="flex-1 bg-transparent hover:bg-blue-50"
                                >
                                  <Link href={`/book/${book.id}`}>
                                    <Eye className="h-3 w-3 mr-1" />
                                    View
                                  </Link>
                                </Button>

                                {(book.status === "exchanged" || book.status === "sold") && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleContactBook(book)}
                                    className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                                  >
                                    <User className="h-3 w-3 mr-1" />
                                    Contact
                                  </Button>
                                )}

                                <Button variant="outline" size="sm" className="hover:bg-green-50 bg-transparent">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteBook(book.id)}
                                  className="hover:bg-red-50"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </ScaleIn>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                )}
              </TabsContent>

              <TabsContent value="received-requests">
                {receivedRequests.length === 0 ? (
                  <FadeIn>
                    <Card className="text-center py-16 border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
                      <CardContent>
                        <div className="mb-8">
                          <img
                            src="/placeholder.svg?height=200&width=300&text=💬📩✉️📬"
                            alt="No Requests"
                            className="w-64 h-32 mx-auto rounded-2xl shadow-lg object-cover"
                          />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">No requests received</h3>
                        <p className="text-gray-600 max-w-md mx-auto text-lg">
                          When people are interested in your books, their requests will appear here
                        </p>
                      </CardContent>
                    </Card>
                  </FadeIn>
                ) : (
                  <StaggerContainer className="space-y-6">
                    {receivedRequests.map((request, index) => (
                      <StaggerItem key={request.id}>
                        <ScaleIn delay={index * 0.1}>
                          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-white to-gray-50">
                            <CardContent className="p-8">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                      {request.requesterName.charAt(0)}
                                    </div>
                                    <div>
                                      <h3 className="font-bold text-xl text-gray-900">{request.bookTitle}</h3>
                                      <p className="text-gray-600">
                                        Request from{" "}
                                        <strong className="text-orange-600">{request.requesterName}</strong>
                                      </p>
                                    </div>
                                  </div>
                                  <p className="text-gray-700 mb-4 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border-l-4 border-blue-400">
                                    {request.message}
                                  </p>
                                  <p className="text-sm text-gray-500">{request.createdAt.toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4 ml-8">
                                  <Badge
                                    className={cn("shadow-lg text-sm px-3 py-1", getRequestStatusColor(request.status))}
                                  >
                                    {request.status}
                                  </Badge>
                                  {request.status === "pending" && (
                                    <div className="flex gap-3">
                                      <Button
                                        size="sm"
                                        onClick={() => handleRequestAction(request.id, "accept")}
                                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Accept
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleRequestAction(request.id, "reject")}
                                        className="hover:bg-red-50 border-red-200 text-red-600"
                                      >
                                        <X className="h-4 w-4 mr-2" />
                                        Reject
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </ScaleIn>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                )}
              </TabsContent>

              <TabsContent value="achievements">
                <FadeIn>
                  <DonorRecognition />
                </FadeIn>
              </TabsContent>

              <TabsContent value="activity">
                <FadeIn>
                  <Card className="border-0 shadow-2xl">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                        <Activity className="h-6 w-6 text-blue-600 mr-3" />
                        Recent Activity
                      </h3>
                      <div className="mb-8 text-center">
                        <img
                          src="/placeholder.svg?height=120&width=400&text=📊📈💬👥🔄📚"
                          alt="Activity"
                          className="w-96 h-24 mx-auto rounded-xl shadow-md object-cover"
                        />
                      </div>
                      <div className="space-y-6">
                        {[
                          { type: "Listed", book: "The Great Gatsby", time: "2 hours ago", color: "green" },
                          {
                            type: "Received Request",
                            book: "JavaScript: The Good Parts",
                            time: "1 day ago",
                            color: "blue",
                          },
                          { type: "Book Viewed", book: "The Great Gatsby", time: "2 days ago", color: "purple" },
                          { type: "Achievement Unlocked", book: "Book Champion", time: "3 days ago", color: "yellow" },
                        ].map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-6 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl hover:shadow-lg transition-all duration-300"
                          >
                            <div
                              className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg",
                                activity.color === "green" && "bg-gradient-to-r from-green-400 to-green-600",
                                activity.color === "blue" && "bg-gradient-to-r from-blue-400 to-blue-600",
                                activity.color === "purple" && "bg-gradient-to-r from-purple-400 to-purple-600",
                                activity.color === "yellow" && "bg-gradient-to-r from-yellow-400 to-orange-500",
                              )}
                            >
                              <Activity className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg text-gray-900 mb-1">{activity.type}</h4>
                              <p className="text-gray-600">{activity.book}</p>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline">{activity.time}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              </TabsContent>

              <TabsContent value="insights">
                <FadeIn>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
                      <CardContent className="p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                          <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                          Community Impact
                        </h3>
                        <div className="mb-6 text-center">
                          <img
                            src="/placeholder.svg?height=100&width=200&text=🌍📚💫🤝📊"
                            alt="Community Impact"
                            className="w-48 h-20 mx-auto rounded-lg object-cover"
                          />
                        </div>
                        <div className="space-y-6">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">{user.stats.totalViews}</div>
                            <p className="text-gray-600">Total Profile Views</p>
                          </div>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600 mb-2">{user.stats.booksShared}</div>
                            <p className="text-gray-600">Books Shared</p>
                          </div>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600 mb-2">{user.stats.totalMessages}</div>
                            <p className="text-gray-600">Messages Exchanged</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50">
                      <CardContent className="p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                          <Award className="h-5 w-5 text-green-600 mr-2" />
                          Achievements Progress
                        </h3>
                        <div className="mb-6 text-center">
                          <img
                            src="/placeholder.svg?height=100&width=200&text=🏆⭐🎯📈🔥"
                            alt="Achievements"
                            className="w-48 h-20 mx-auto rounded-lg object-cover"
                          />
                        </div>
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Unlocked Achievements</span>
                            <div className="text-2xl font-bold text-green-600">{user.achievements.length}/10</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Reading Streak</span>
                            <div className="text-2xl font-bold text-emerald-600">{user.stats.currentStreak} days</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Level Progress</span>
                            <div className="text-2xl font-bold text-teal-600">65%</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </FadeIn>
              </TabsContent>

              <TabsContent value="messages">
                {contactMessages.length === 0 ? (
                  <FadeIn>
                    <Card className="text-center py-16 border-0 shadow-xl bg-gradient-to-br from-pink-50 to-rose-50">
                      <CardContent>
                        <div className="mb-8">
                          <img
                            src="/placeholder.svg?height=200&width=300&text=💬📱✉️📞"
                            alt="No Messages"
                            className="w-64 h-32 mx-auto rounded-2xl shadow-lg object-cover"
                          />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">No messages yet</h3>
                        <p className="text-gray-600 max-w-md mx-auto text-lg">
                          When people are interested in your books for exchange or sale, their messages will appear here
                        </p>
                      </CardContent>
                    </Card>
                  </FadeIn>
                ) : (
                  <StaggerContainer className="space-y-6">
                    {contactMessages.map((msg, index) => (
                      <StaggerItem key={msg.id}>
                        <ScaleIn delay={index * 0.1}>
                          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-white to-pink-50">
                            <CardContent className="p-8">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                      {msg.senderName.charAt(0)}
                                    </div>
                                    <div>
                                      <h3 className="font-bold text-xl text-gray-900">{msg.bookTitle}</h3>
                                      <p className="text-gray-600">
                                        Message from <strong className="text-pink-600">{msg.senderName}</strong>
                                      </p>
                                      <p className="text-sm text-gray-500">Contact: {msg.contactInfo}</p>
                                    </div>
                                  </div>
                                  <p className="text-gray-700 mb-4 bg-gradient-to-r from-gray-50 to-pink-50 p-4 rounded-xl border-l-4 border-pink-400">
                                    {msg.message}
                                  </p>
                                  <p className="text-sm text-gray-500">{msg.createdAt.toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4 ml-8">
                                  <Badge className="bg-green-100 text-green-800 border-green-200 shadow-lg text-sm px-3 py-1">
                                    New
                                  </Badge>
                                  <div className="flex gap-3">
                                    <Button
                                      size="sm"
                                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg"
                                    >
                                      Reply
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="hover:bg-pink-50 border-pink-200 text-pink-600 bg-transparent"
                                    >
                                      Mark as Read
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </ScaleIn>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <AnimatedFooter />
      </div>

      {/* Profile Settings Modal */}
      <ProfileSettings open={showProfileSettings} onOpenChange={setShowProfileSettings} />

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        book={selectedBook}
        onSendMessage={handleContactMessage}
      />
    </>
  )
}
