"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Navigation,
  Search,
  Filter,
  Layers,
  Compass,
  Target,
  Book,
  Users,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock data for books
const mockBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    type: "exchange",
    price: null,
    images: ["/placeholder.svg?height=200&width=150"],
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    type: "sell",
    price: 299,
    images: ["/placeholder.svg?height=200&width=150"],
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    type: "donate",
    price: null,
    images: ["/placeholder.svg?height=200&width=150"],
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    type: "lend",
    price: null,
    images: ["/placeholder.svg?height=200&width=150"],
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    type: "exchange",
    price: null,
    images: ["/placeholder.svg?height=200&width=150"],
  },
  {
    id: "6",
    title: "Lord of the Flies",
    author: "William Golding",
    type: "sell",
    price: 199,
    images: ["/placeholder.svg?height=200&width=150"],
  },
]

const mapFilters = [
  { name: "All Books", value: "all", icon: Book },
  { name: "Free Books", value: "free", icon: Star },
  { name: "Recent", value: "recent", icon: Clock },
  { name: "Popular", value: "popular", icon: TrendingUp },
]

const locationAreas = [
  "All Areas",
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Bangalore, Karnataka",
  "Chennai, Tamil Nadu",
  "Pune, Maharashtra",
  "Hyderabad, Telangana",
]

interface UserLocation {
  lat: number
  lng: number
}

type LocationStatus = "idle" | "loading" | "granted" | "denied" | "unsupported"

export default function MapPage() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle")
  const [locationMessage, setLocationMessage] = useState<string>("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedArea, setSelectedArea] = useState("All Areas")
  const [searchTerm, setSearchTerm] = useState("")
  const [nearbyBooks, setNearbyBooks] = useState(mockBooks.slice(0, 6))

  useEffect(() => {
    if (!navigator.permissions) return
    navigator.permissions
      .query({ name: "geolocation" as PermissionName })
      .then((result) => {
        if (result.state === "granted") {
          setLocationStatus("granted")
        } else if (result.state === "denied") {
          setLocationStatus("denied")
          setLocationMessage("Location access has been blocked in your browser settings.")
        }
        // Listen for changes (e.g., user changes site-permission in settings tab)
        result.onchange = () => {
          if (result.state === "granted") {
            setLocationStatus("granted")
            setLocationMessage("")
          } else if (result.state === "denied") {
            setLocationStatus("denied")
            setLocationMessage("Location access has been blocked in your browser settings.")
          }
        }
      })
      .catch(() => {
        // Permissions API not supported
        setLocationStatus("unsupported")
      })
  }, [])

  const handleLocationRequest = () => {
    if (!navigator.geolocation) {
      setLocationStatus("unsupported")
      setLocationMessage("Geolocation is not supported by this browser.")
      return
    }

    setLocationStatus("loading")
    setLocationMessage("Requesting your location…")

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
        setLocationStatus("granted")
        setLocationMessage("")
      },
      () => {
        setLocationStatus("denied")
        setLocationMessage("We couldn't access your location. Please allow location access in the browser.")
      },
      { enableHighAccuracy: true, timeout: 9000 },
    )
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Explore Your Area</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Books
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Near You
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover amazing books available in your neighborhood. Connect with local readers and build your
              community.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Search and Filters */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search books or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-200"
                />
              </div>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger className="h-12 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locationAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-60"
                onClick={handleLocationRequest}
                disabled={locationStatus === "loading"}
              >
                <Target className="mr-2 h-4 w-4" />
                Find My Location
              </Button>
            </div>

            {locationMessage && (
              <div
                className={cn(
                  "mb-4 p-3 rounded-lg border text-sm",
                  locationStatus === "denied" || locationStatus === "unsupported"
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "bg-blue-50 border-blue-200 text-blue-600",
                )}
              >
                {locationMessage}
              </div>
            )}

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              {mapFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedFilter === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.value)}
                  className={cn(
                    "transition-all",
                    selectedFilter === filter.value
                      ? "bg-blue-500 hover:bg-blue-600 shadow-lg"
                      : "hover:bg-blue-50 hover:border-blue-200",
                  )}
                >
                  <filter.icon className="h-4 w-4 mr-2" />
                  {filter.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0 h-full relative">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                      <MapPin className="h-12 w-12 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive Map</h3>
                      <p className="text-gray-600 mb-6 max-w-md">
                        Google Maps integration would display book locations, user positions, and interactive markers
                        here
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center">
                        <Button
                          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60"
                          onClick={handleLocationRequest}
                          disabled={locationStatus === "loading"}
                        >
                          <Navigation className="mr-2 h-4 w-4" />
                          Enable Location
                        </Button>
                        <Button variant="outline">
                          <Layers className="mr-2 h-4 w-4" />
                          Map Layers
                        </Button>
                        <Button variant="outline">
                          <Compass className="mr-2 h-4 w-4" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                {/* Location Status */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        locationStatus === "granted" ? "bg-green-400 animate-pulse" : "bg-gray-400",
                      )}
                    />
                    <span className="text-gray-700">
                      {locationStatus === "granted"
                        ? "Location enabled"
                        : locationStatus === "loading"
                          ? "Locating…"
                          : "Location disabled"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nearby Books */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="mr-2 h-5 w-5 text-blue-500" />
                  Nearby Books
                </CardTitle>
                <CardDescription>Books available in your area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {nearbyBooks.map((book) => (
                  <Link key={book.id} href={`/book/${book.id}`}>
                    <div className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100 hover:border-gray-200 hover:shadow-md">
                      <img
                        src={book.images[0] || "/placeholder.svg?height=80&width=60"}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded shadow-sm group-hover:shadow-md transition-shadow"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {book.title}
                        </h4>
                        <p className="text-sm text-gray-600 truncate">by {book.author}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{(Math.random() * 5 + 0.5).toFixed(1)} km away</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <Badge className={cn("text-xs", getTypeColor(book.type))}>{book.type}</Badge>
                          {book.type === "sell" && book.price && (
                            <span className="text-sm font-semibold text-green-600">₹{book.price}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Area Stats */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-orange-500" />
                  Area Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">127</div>
                    <div className="text-xs text-gray-600">Total Books</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-green-600">89</div>
                    <div className="text-xs text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-purple-600">34</div>
                    <div className="text-xs text-gray-600">Free Books</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-orange-600">2.3</div>
                    <div className="text-xs text-gray-600">Avg Distance</div>
                  </div>
                </div>
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">
                    Most active area: <span className="font-semibold text-orange-600">Bandra West</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
