"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import axios from "axios"

export interface User {
  _id: string
  name: string
  email: string
  // Add more fields if needed
}

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

  const API_URL = "http://localhost:5000/api/auth" // Update if deployed

  useEffect(() => {
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
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password })
      const { token, user } = response.data

      // Store token and user in localStorage
      localStorage.setItem("token", token)
      localStorage.setItem("bookbridge-user", JSON.stringify(user))

      setUser(user)
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      await axios.post(`${API_URL}/register`, { name, email, password })
      return await login(email, password) // Auto-login
    } catch (error) {
      console.error("Register error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("bookbridge-user")
    localStorage.removeItem("token")
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
