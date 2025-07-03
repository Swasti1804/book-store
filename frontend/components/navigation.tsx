"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Book, Menu, X, Search, Plus, Map, Library, Bell, User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Book className="h-8 w-8 text-orange-600" />
              <span className="text-xl font-bold text-gray-900">BookBridge</span>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Book className="h-8 w-8 text-orange-600" />
              <span className="text-xl font-bold text-gray-900">BookBridge</span>
            </Link>
          </div>

          {user ? (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  href="/discover"
                  className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <Search className="h-4 w-4" />
                  <span>Discover</span>
                </Link>
                <Link
                  href="/list-book"
                  className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>List Book</span>
                </Link>
                <Link
                  href="/map"
                  className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <Map className="h-4 w-4" />
                  <span>Map</span>
                </Link>
                <Link
                  href="/library"
                  className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <Library className="h-4 w-4" />
                  <span>My Library</span>
                </Link>
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || ""} alt={user.name || ""} />
                        <AvatarFallback>{user.name?.charAt(0) || user.email?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden">
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/auth" className="text-gray-600 hover:text-orange-600 transition-colors">
                Sign In
              </Link>
              <Button asChild className="bg-orange-600 hover:bg-orange-700">
                <Link href="/auth">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isOpen && user && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/discover" className="block px-3 py-2 text-gray-600 hover:text-orange-600">
                Discover Books
              </Link>
              <Link href="/list-book" className="block px-3 py-2 text-gray-600 hover:text-orange-600">
                List a Book
              </Link>
              <Link href="/map" className="block px-3 py-2 text-gray-600 hover:text-orange-600">
                Map View
              </Link>
              <Link href="/library" className="block px-3 py-2 text-gray-600 hover:text-orange-600">
                My Library
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-orange-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
