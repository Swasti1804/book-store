"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Book,
  Search,
  MapPin,
  Library,
  Plus,
  Bell,
  Settings,
  LogOut,
  Menu,
  Home,
  MessageCircle,
  Heart,
  Trophy,
  Zap,
  Crown,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "./auth-provider"
import { ProfileSettings } from "./profile-settings"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Discover", href: "/discover", icon: Search },
  { name: "Map", href: "/map", icon: MapPin },
  { name: "My Library", href: "/library", icon: Library },
  { name: "List Book", href: "/list-book", icon: Plus },
]

export function EnhancedNavigation() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [notifications] = useState(3) // Mock notification count

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-gray-200" : "bg-white border-gray-100",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Book className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                BookBridge
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={cn(
                          "relative px-4 py-2 rounded-xl transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                            : "hover:bg-gray-100 text-gray-700",
                        )}
                      >
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.name}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl -z-10"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </Button>
                    </motion.div>
                  </Link>
                )
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {/* Notifications */}
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {notifications > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                          {notifications}
                        </Badge>
                      )}
                    </Button>
                  </motion.div>

                  {/* User Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="ghost"
                          className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-100"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="hidden lg:block text-left">
                            <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <Crown className="h-3 w-3 mr-1 text-yellow-500" />
                              Level {Math.floor(user.stats.impactScore / 200) + 1}
                            </div>
                          </div>
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </Button>
                      </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 p-4">
                      <DropdownMenuLabel className="p-0">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-white text-xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 text-lg">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                            <div className="flex items-center mt-2 space-x-4">
                              <Badge variant="secondary" className="flex items-center">
                                <Crown className="h-3 w-3 mr-1 text-yellow-500" />
                                Level {Math.floor(user.stats.impactScore / 200) + 1}
                              </Badge>
                              <Badge variant="outline" className="flex items-center">
                                <Trophy className="h-3 w-3 mr-1 text-purple-500" />#{user.stats.communityRank}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </DropdownMenuLabel>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Zap className="h-4 w-4 text-blue-500 mr-1" />
                            <span className="font-bold text-gray-900">{user.stats.impactScore}</span>
                          </div>
                          <div className="text-xs text-gray-600">Impact</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Book className="h-4 w-4 text-green-500 mr-1" />
                            <span className="font-bold text-gray-900">{user.stats.booksListed}</span>
                          </div>
                          <div className="text-xs text-gray-600">Books</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Heart className="h-4 w-4 text-red-500 mr-1" />
                            <span className="font-bold text-gray-900">{user.stats.booksShared}</span>
                          </div>
                          <div className="text-xs text-gray-600">Shared</div>
                        </div>
                      </div>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem onClick={() => setShowProfileSettings(true)} className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Profile Settings</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        <span>Messages</span>
                        {notifications > 0 && <Badge className="ml-auto bg-red-500 text-white">{notifications}</Badge>}
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/auth">
                    <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <SheetHeader>
                      <SheetTitle className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <Book className="h-4 w-4 text-white" />
                        </div>
                        <span>BookBridge</span>
                      </SheetTitle>
                      <SheetDescription>Navigate through your book sharing journey</SheetDescription>
                    </SheetHeader>

                    <div className="mt-8 space-y-4">
                      {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                          <Link key={item.name} href={item.href}>
                            <Button
                              variant={isActive ? "default" : "ghost"}
                              className={cn(
                                "w-full justify-start",
                                isActive && "bg-gradient-to-r from-orange-500 to-red-500 text-white",
                              )}
                            >
                              <item.icon className="mr-3 h-5 w-5" />
                              {item.name}
                            </Button>
                          </Link>
                        )
                      })}

                      {!user && (
                        <>
                          <div className="border-t pt-4 mt-6">
                            <Link href="/auth">
                              <Button variant="outline" className="w-full mb-3 bg-transparent">
                                Sign In
                              </Button>
                            </Link>
                            <Link href="/auth">
                              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                Get Started
                              </Button>
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Profile Settings Modal */}
      <ProfileSettings open={showProfileSettings} onOpenChange={setShowProfileSettings} />
    </>
  )
}
