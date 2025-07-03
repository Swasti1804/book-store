"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Book, MapPin, DollarSign, ArrowLeft, Camera, X, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { addNewBook, mockCurrentUser } from "@/lib/mock-data"

const categories = [
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

const conditions = [
  { value: "new", label: "New", description: "Brand new, never used" },
  { value: "excellent", label: "Excellent", description: "Like new, minimal wear" },
  { value: "good", label: "Good", description: "Some wear but fully readable" },
  { value: "fair", label: "Fair", description: "Well-used but complete" },
  { value: "poor", label: "Poor", description: "Heavily worn but readable" },
]

export default function ListBookPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    type: "",
    condition: "",
    description: "",
    location: mockCurrentUser.location, // Pre-fill with user's location
    price: "",
    exchangeWish: "",
  })

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + selectedImages.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 5 images",
        variant: "destructive",
      })
      return
    }
    setSelectedImages((prev) => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create new book object
      const newBook = {
        title: formData.title,
        author: formData.author,
        category: formData.category,
        type: formData.type as "exchange" | "sell" | "donate" | "lend",
        condition: formData.condition as "new" | "excellent" | "good" | "fair" | "poor",
        description: formData.description,
        location: formData.location,
        price: formData.type === "sell" ? formData.price : undefined,
        exchangeWish: formData.type === "exchange" ? formData.exchangeWish : undefined,
        images: ["/placeholder.svg?height=300&width=200"], // In real app, upload images
        ownerId: user.id,
        ownerName: user.name,
        ownerEmail: user.email,
        status: "available" as const,
      }

      // Add book to both user's library and discover page
      const addedBook = addNewBook(newBook)

      toast({
        title: "Success! 🎉",
        description: "Your book has been listed and is now visible on the discover page",
      })

      // Redirect to library to see the new book
      router.push("/library")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to list book",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    router.push("/auth")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">List a New Book</h1>
            <p className="text-gray-600">Share your book with the community and it will appear on the discover page</p>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
            <CardTitle className="flex items-center text-2xl">
              <Book className="mr-3 h-6 w-6 text-orange-600" />
              Book Details
            </CardTitle>
            <CardDescription className="text-lg">
              Fill in the information about your book. Once submitted, it will be visible to all users on the discover
              page.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Book Images */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Book Images (Max 5)</Label>
                <div className="border-2 border-dashed border-orange-300 rounded-xl p-8 text-center bg-orange-50/50 hover:bg-orange-50 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Camera className="mx-auto h-16 w-16 text-orange-400 mb-4" />
                    <p className="text-gray-700 text-lg font-medium">Click to upload book images</p>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB each</p>
                  </label>
                </div>

                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 shadow-lg"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-lg font-semibold">
                    Book Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter book title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="h-12 text-lg"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="author" className="text-lg font-semibold">
                    Author *
                  </Label>
                  <Input
                    id="author"
                    placeholder="Enter author name"
                    value={formData.author}
                    onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                    className="h-12 text-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-lg font-semibold">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select category" />
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
                <div className="space-y-3">
                  <Label className="text-lg font-semibold">Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exchange">Exchange</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                      <SelectItem value="donate">Donate</SelectItem>
                      <SelectItem value="lend">Lend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-lg font-semibold">Condition *</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, condition: value }))}
                >
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition.value} value={condition.value}>
                        <div>
                          <div className="font-medium">{condition.label}</div>
                          <div className="text-sm text-gray-500">{condition.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-lg font-semibold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the book's content, condition, or any special notes..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="text-lg"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="location" className="text-lg font-semibold">
                  Location *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="Enter your location (city, area)"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    className="pl-12 h-12 text-lg"
                    required
                  />
                </div>
              </div>

              {formData.type === "sell" && (
                <div className="space-y-3">
                  <Label htmlFor="price" className="text-lg font-semibold">
                    Price (₹)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="Enter selling price"
                      value={formData.price}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                      className="pl-12 h-12 text-lg"
                    />
                  </div>
                </div>
              )}

              {formData.type === "exchange" && (
                <div className="space-y-3">
                  <Label htmlFor="exchangeWish" className="text-lg font-semibold">
                    What would you like in exchange?
                  </Label>
                  <Input
                    id="exchangeWish"
                    placeholder="e.g., Fiction books, Science textbooks, etc."
                    value={formData.exchangeWish}
                    onChange={(e) => setFormData((prev) => ({ ...prev, exchangeWish: e.target.value }))}
                    className="h-12 text-lg"
                  />
                </div>
              )}

              {/* Success Message */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-900">Your book will be visible to everyone!</h3>
                    <p className="text-green-700">
                      Once you submit, your book will automatically appear on the discover page for all users to see and
                      request.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 pt-6">
                <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1 h-12 text-lg">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Listing..." : "List Book & Share"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
