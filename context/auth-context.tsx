"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  username: string
  email?: string
}

type AuthContextType = {
  user: User | null
  login: (
    usernameOrEmail: string,
    password: string,
  ) => Promise<{ success: boolean; requireTwoFactor?: boolean; email?: string }>
  verifyTwoFactor: (email: string, code: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (usernameOrEmail: string, password: string) => {
    // Check if it's a username login
    if (usernameOrEmail === "Roslem" && password === "Roslem1957") {
      const user = { username: "Roslem" }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      return { success: true }
    }

    // Check if it's an email login that requires 2FA
    if (usernameOrEmail === "sudora02@gmail.com" && password === "Roslem1957") {
      // In a real app, we would send a verification code to the email
      // For demo purposes, we'll just return that 2FA is required
      return {
        success: false,
        requireTwoFactor: true,
        email: usernameOrEmail,
      }
    }

    return { success: false }
  }

  const verifyTwoFactor = async (email: string, code: string) => {
    // In a real app, we would verify the code against what was sent
    // For demo purposes, we'll accept "123456" as the valid code
    if (code === "123456") {
      const user = {
        username: "Roslem",
        email: email,
      }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, verifyTwoFactor, logout, isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
