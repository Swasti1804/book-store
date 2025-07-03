import { mockCurrentUser, type MockUser } from "./mock-data"

// Mock authentication context
let currentUser: MockUser | null = null
let isAuthenticated = false

export const mockAuth = {
  getCurrentUser: () => currentUser,
  isAuthenticated: () => isAuthenticated,
  signIn: async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    currentUser = mockCurrentUser
    isAuthenticated = true
    return currentUser
  },
  signUp: async (email: string, password: string, username: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    currentUser = { ...mockCurrentUser, name: username, email }
    isAuthenticated = true
    return currentUser
  },
  signOut: async () => {
    currentUser = null
    isAuthenticated = false
  },
  signInWithGoogle: async () => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    currentUser = mockCurrentUser
    isAuthenticated = true
    return currentUser
  },
}

// Mock auth state listeners
const authListeners: ((user: MockUser | null) => void)[] = []

export const onAuthStateChanged = (callback: (user: MockUser | null) => void) => {
  authListeners.push(callback)
  // Immediately call with current state
  callback(currentUser)

  // Return unsubscribe function
  return () => {
    const index = authListeners.indexOf(callback)
    if (index > -1) {
      authListeners.splice(index, 1)
    }
  }
}

// Helper to notify all listeners
const notifyAuthListeners = () => {
  authListeners.forEach((callback) => callback(currentUser))
}

// Update mock auth to notify listeners
mockAuth.signIn = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  currentUser = mockCurrentUser
  isAuthenticated = true
  notifyAuthListeners()
  return currentUser
}

mockAuth.signUp = async (email: string, password: string, username: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  currentUser = { ...mockCurrentUser, name: username, email }
  isAuthenticated = true
  notifyAuthListeners()
  return currentUser
}

mockAuth.signOut = async () => {
  currentUser = null
  isAuthenticated = false
  notifyAuthListeners()
}

mockAuth.signInWithGoogle = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  currentUser = mockCurrentUser
  isAuthenticated = true
  notifyAuthListeners()
  return currentUser
}
