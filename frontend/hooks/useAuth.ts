// hooks/useAuth.ts
"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const BASE_URL = "http://localhost:5000/api/auth"  // change if deployed

export interface Stats {
  booksListed: number
  booksShared: number
  totalDonations: number
  impactScore: number
  currentStreak: number
  level: string
  totalViews: number
  totalMessages: number
  communityRank: number
  booksRead: number
  readingGoal: number
}

export interface User {
  id: string
  name: string
  email: string
  stats: Stats
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on first mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      })

      const { token, user } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post(`${BASE_URL}/register`, {
        name,
        email,
        password,
      })

      // auto-login after register
      return await login(email, password)
    } catch (error) {
      console.error("Register error:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return {
    user,
    login,
    register,
    logout,
    updateUser,
    isLoading,
  }
}
