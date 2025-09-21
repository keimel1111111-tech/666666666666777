"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  businessName: string
  businessType: string
  products?: string[] // Added products array to user interface
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  showApp: boolean
  setShowApp: (show: boolean) => void
}

interface RegisterData {
  name: string
  email: string
  password: string
  businessName: string
  businessType: string
  products?: string[] // Added products to registration data
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showApp, setShowApp] = useState(false)

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem("keitel_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("keitel_users") || "[]")
      const foundUser = users.find((u: any) => u.email === email && u.password === password)

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem("keitel_user", JSON.stringify(userWithoutPassword))
        setShowApp(true)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem("keitel_users") || "[]")

      // Check if email already exists
      if (users.some((u: any) => u.email === userData.email)) {
        return false
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
      }

      // Save to users list
      users.push(newUser)
      localStorage.setItem("keitel_users", JSON.stringify(users))

      if (userData.products && userData.products.length > 0) {
        localStorage.setItem(`keitel_default_services_${newUser.id}`, JSON.stringify(userData.products))
      }

      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("keitel_user")
    setShowApp(false)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, showApp, setShowApp }}>
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
