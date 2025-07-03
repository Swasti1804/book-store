"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Book,
  Heart,
  Eye,
  Grid3X3,
  List,
  Filter,
  Sparkles,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { mockBooks, type MockBook } from "@/lib/mock-data"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const categories = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Academic",
  "Self-Help",
  "Biography",
  "Science",
  "History",
  "Romance",
  "Mystery",
  "Fantasy",
  "Children",
  "Textbook",
  "Reference",
  "Poetry",
  "Drama",
]

const types = ["All", "Exchange", "Sell", "Donate", "Lend"]
const conditions = ["All", "New", "Excellent", "Good", "Fair", "Poor"]

const quickFilters = [
  { name: "Recently Added", icon: Clock, filter: "recent" },
  { name: "Most Popular", icon: TrendingUp, filter: "popular" },
  { name: "Highly Rated", icon: Star, filter: "rated" },
  { name: "Free Books", icon: Sparkles, filter: "free" },
]

export default function DiscoverPage() {
  const { user } = useAuth()
  const [books, setBooks] = useState<MockBook[]>([])
  const [filteredBooks, setFilteredBooks] = useState<MockBook[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedCondition, setSelectedCondition] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("recent")

  useEffect(() => {
    setTimeout(() => {
      const filteredData = mockBooks.filter((book) => book.ownerId !== user?.id)
      setBooks(filteredData)
      setLoading(false)
    }, 1000)
  }, [user])

  useEffect(() => {
    let filtered = books

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((book) => book.category === selectedCategory)
    }

    if (selectedType !== "All") {
      filtered = filtered.filter((book) => book.type === selectedType.toLowerCase())
    }

    if (selectedCondition !== "All") {
      filtered = filtered.filter((book) => book.condition === selectedCondition.toLowerCase())
    }

    // Apply quick filters
    if (activeQuickFilter) {
      switch (activeQuickFilter) {
        case "recent":
          filtered = filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          break
        case "popular":
          filtered = filtered.sort((a, b) => b.views - a.views)
          break
        case "rated":
          filtered = filtered.sort((a, b) => b.likes - a.likes)
          break
        case "free":
          filtered = filtered.filter((book) => book.type === "donate" || book.type === "lend")
          break
      }
    }

    setFilteredBooks(filtered)
  }, [books, searchTerm, selectedCategory, selectedType, selectedCondition, activeQuickFilter])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "exchange":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "sell":
        return "bg-green-100 text-green-800 border-green-200"
      case "donate":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "lend":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200"
      case "good":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "fair":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "poor":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">Discover Amazing Books</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Find Your Next
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Great Read
              </span>
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Explore thousands of books shared by our amazing community. From bestsellers to hidden gems, your next
              favorite book is waiting to be discovered.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Enhanced Search */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by title, author, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="lg"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="lg"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowFilters(!showFilters)}
                  className={showFilters ? "bg-orange-50 border-orange-200" : ""}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {quickFilters.map((filter) => (
                <Button
                  key={filter.filter}
                  variant={activeQuickFilter === filter.filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveQuickFilter(activeQuickFilter === filter.filter ? null : filter.filter)}
                  className={cn(
                    "transition-all",
                    activeQuickFilter === filter.filter
                      ? "bg-orange-500 hover:bg-orange-600 shadow-lg"
                      : "hover:bg-orange-50 hover:border-orange-200",
                  )}
                >
                  <filter.icon className="h-4 w-4 mr-2" />
                  {filter.name}
                </Button>
              ))}
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Condition</label>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recently Added</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price">Price: Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredBooks.length} Book{filteredBooks.length !== 1 ? "s" : ""} Found
              </h2>
              <p className="text-gray-600">
                {activeQuickFilter && `Filtered by: ${quickFilters.find((f) => f.filter === activeQuickFilter)?.name}`}
              </p>
            </div>
          </div>

          {filteredBooks.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <Book className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No books found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                    setSelectedType("All")
                    setSelectedCondition("All")
                    setActiveQuickFilter(null)
                  }}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div
              className={cn(
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4",
              )}
            >
              {filteredBooks.map((book) => (
                <Link key={book.id} href={`/book/${book.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-lg overflow-hidden">
                    {viewMode === "grid" ? (
                      <>
                        <div className="relative overflow-hidden">
                          <img
                            src={book.images?.[0] || "/placeholder.svg?height=200&width=300"}
                            alt={book.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute top-3 right-3 flex gap-2">
                            <Badge className={cn("shadow-lg", getTypeColor(book.type))}>{book.type}</Badge>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center justify-between text-white text-sm">
                              <div className="flex items-center space-x-3">
                                <span className="flex items-center">
                                  <Eye className="h-3 w-3 mr-1" />
                                  {book.views}
                                </span>
                                <span className="flex items-center">
                                  <Heart className="h-3 w-3 mr-1" />
                                  {book.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className={getConditionColor(book.condition)}>
                              {book.condition}
                            </Badge>
                            <Badge variant="outline" className="border-gray-200">
                              {book.category}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="truncate">{book.location?.address || "Unknown Location"}</span>
                          </div>
                          {book.type === "sell" && book.price && (
                            <div className="text-lg font-bold text-green-600">₹{book.price}</div>
                          )}
                          {book.type === "exchange" && book.exchangeWish && (
                            <div className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              Wants: {book.exchangeWish}
                            </div>
                          )}
                        </CardContent>
                      </>
                    ) : (
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <img
                            src={book.images?.[0] || "/placeholder.svg?height=120&width=80"}
                            alt={book.title}
                            className="w-24 h-32 object-cover rounded-lg shadow-md"
                          />
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-bold text-xl text-gray-900 group-hover:text-orange-600 transition-colors">
                                  {book.title}
                                </h3>
                                <p className="text-gray-600">by {book.author}</p>
                              </div>
                              <Badge className={cn("shadow-sm", getTypeColor(book.type))}>{book.type}</Badge>
                            </div>
                            <p className="text-gray-600 line-clamp-2">{book.description}</p>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className={getConditionColor(book.condition)}>
                                {book.condition}
                              </Badge>
                              <Badge variant="outline">{book.category}</Badge>
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-3 w-3 mr-1" />
                                  {book.location?.address || "Unknown Location"}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              {book.type === "sell" && book.price && (
                                <div className="text-xl font-bold text-green-600">₹{book.price}</div>
                              )}
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Eye className="h-3 w-3 mr-1" />
                                  {book.views}
                                </span>
                                <span className="flex items-center">
                                  <Heart className="h-3 w-3 mr-1" />
                                  {book.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
