"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, Calendar, Eye, Heart, MessageCircle, Share2, Flag, Star, Send } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { mockBooks, mockMessages, type MockBook, type MockMessage } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

export default function BookDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [book, setBook] = useState<MockBook | null>(null)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<MockMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [sendingMessage, setSendingMessage] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      const foundBook = mockBooks.find((book) => book.id === id)
      if (foundBook) {
        setBook(foundBook)
        // Load messages for this book
        const bookMessages = mockMessages.filter((msg) => msg.bookId.toString() === id)

        setMessages(bookMessages)
      }
      setLoading(false)
    }, 1000)
  }, [id])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !user || !book) return

    setSendingMessage(true)
    try {
      // Simulate sending message
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newMsg: MockMessage = {
        id: `msg-${Date.now()}`,
        bookId: id as string,
        senderId: user.id,
        senderName: user.name,
        message: newMessage,
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, newMsg])
      setNewMessage("")

      toast({
        title: "Message sent!",
        description: "Your message has been sent to the book owner.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSendingMessage(false)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "exchange":
        return "bg-blue-100 text-blue-800"
      case "sell":
        return "bg-green-100 text-green-800"
      case "donate":
        return "bg-purple-100 text-purple-800"
      case "lend":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new":
        return "bg-emerald-100 text-emerald-800"
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-yellow-100 text-yellow-800"
      case "fair":
        return "bg-orange-100 text-orange-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book not found</h2>
          <p className="text-gray-600 mb-4">The book you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/discover")}>Back to Discover</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Book Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={book.images[currentImageIndex] || "/placeholder.svg?height=400&width=400"}
                alt={book.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              {book.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {book.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              )}
            </div>
            {book.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {book.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden ${
                      index === currentImageIndex ? "ring-2 ring-orange-500" : ""
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${book.title} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                  <p className="text-xl text-gray-600">by {book.author}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getTypeColor(book.type)}>{book.type}</Badge>
                <Badge variant="outline" className={getConditionColor(book.condition)}>
                  {book.condition}
                </Badge>
                <Badge variant="outline">{book.category}</Badge>
              </div>

              {book.type === "sell" && book.price && (
                <div className="text-2xl font-bold text-green-600 mb-4">₹{book.price}</div>
              )}

              {book.type === "exchange" && book.exchangeWish && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Looking for in exchange:</h3>
                  <p className="text-blue-800">{book.exchangeWish}</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{book.description || "No description provided."}</p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="truncate">{book.location?.address || "Unknown Location"}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {book.createdAt.toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {book.views} views
              </div>
            </div>

            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Book Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{book.ownerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{book.ownerName}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">5.0 (12 reviews)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {user && user.id !== book.ownerId && (
              <div className="space-y-3">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {book.type === "sell"
                    ? "Request to Buy"
                    : book.type === "exchange"
                      ? "Suggest Exchange"
                      : book.type === "lend"
                        ? "Request to Borrow"
                        : "Request Book"}
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Flag className="mr-2 h-4 w-4" />
                  Report Listing
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Messages Section */}
        {user && user.id !== book.ownerId && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Chat with the book owner</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No messages yet. Start a conversation!</p>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === user.id ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === user.id ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs opacity-75 mt-1">{message.createdAt.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                  rows={2}
                />
                <Button type="submit" disabled={sendingMessage || !newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
