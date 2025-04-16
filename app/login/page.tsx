"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { ShellHeader } from "@/components/shell-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("sudora02@gmail.com") // Pre-filled for demo
  const [password, setPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [twoFactorEmail, setTwoFactorEmail] = useState("")
  const [loginMethod, setLoginMethod] = useState<"username" | "email">("username")
  const router = useRouter()
  const { login, verifyTwoFactor } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const usernameOrEmail = loginMethod === "username" ? username : email
      const result = await login(usernameOrEmail, password)

      if (result.success) {
        router.push("/repository")
      } else if (result.requireTwoFactor && result.email) {
        // Show 2FA verification screen
        setTwoFactorEmail(result.email)
        setShowTwoFactor(true)
      } else {
        setError("Invalid username/email or password")
      }
    } catch (err) {
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await verifyTwoFactor(twoFactorEmail, verificationCode)
      if (success) {
        router.push("/repository")
      } else {
        setError("Invalid verification code")
      }
    } catch (err) {
      setError("An error occurred during verification")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ShellHeader />
      <main className="flex-1 flex items-center justify-center bg-gray-50 p-4">
        {!showTwoFactor ? (
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Login to Roslem Hub</CardTitle>
              <CardDescription className="text-center">Enter your credentials to access the repository</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Tabs
                defaultValue="username"
                className="mb-4"
                onValueChange={(value) => setLoginMethod(value as "username" | "email")}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="username" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Username
                  </TabsTrigger>
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="username">
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-username">Password</Label>
                      <Input
                        id="password-username"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-shell-red hover:bg-shell-darkred text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="email">
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-email">Password</Label>
                      <Input
                        id="password-email"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-shell-red hover:bg-shell-darkred text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login with 2FA"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="text-xs text-center text-muted-foreground mt-4">
                For demo purposes, use:
                <br />
                Username: Roslem, Password: Roslem1957
                <br />
                OR
                <br />
                Email: sudora02@gmail.com, Password: Roslem1957
              </p>
            </CardFooter>
          </Card>
        ) : (
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Two-Factor Authentication</CardTitle>
              <CardDescription className="text-center">
                Enter the verification code sent to {twoFactorEmail}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verification-code">Verification Code</Label>
                  <Input
                    id="verification-code"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-shell-red hover:bg-shell-darkred text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => setShowTwoFactor(false)}>
                  Back to Login
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="text-xs text-center text-muted-foreground mt-4">
                For demo purposes, use verification code: 123456
              </p>
            </CardFooter>
          </Card>
        )}
      </main>
      <footer className="bg-shell-gray text-white py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Roslem Hub. All rights reserved.</p>
          <Button
            asChild
            variant="outline"
            className="mt-4 md:mt-0 bg-transparent border-white text-white hover:bg-white/10"
          >
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </footer>
    </div>
  )
}
