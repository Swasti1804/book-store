"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { mockCurrentUser, type User } from "@/lib/mock-data"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (updatedUser: User) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("bookbridge-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user data:", error)
        localStorage.removeItem("bookbridge-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - accept any email/password combination
    if (email && password) {
      const userData = { ...mockCurrentUser, email }
      setUser(userData)
      localStorage.setItem("bookbridge-user", JSON.stringify(userData))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock registration - accept any valid inputs
    if (name && email && password) {
      const userData = {
        ...mockCurrentUser,
        name,
        email,
        id: `user-${Date.now()}`,
        stats: {
          ...mockCurrentUser.stats,
          booksListed: 0,
          booksShared: 0,
          totalDonations: 0,
          impactScore: 0,
          currentStreak: 0,
          level: "Newcomer",
          totalViews: 0,
          totalMessages: 0,
          communityRank: 1000,
          booksRead: 0,
          readingGoal: 12,
        },
      }
      setUser(userData)
      localStorage.setItem("bookbridge-user", JSON.stringify(userData))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("bookbridge-user")
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem("bookbridge-user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
