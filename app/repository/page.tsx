"use client"

import { FileRepository } from "@/components/file-repository"
import { ShellHeader } from "@/components/shell-header"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { TwoFactorBadge } from "@/components/two-factor-badge"

export default function RepositoryPage() {
  const { user, logout } = useAuth()

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <ShellHeader />
        <main className="flex-1 container mx-auto py-10 px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-shell-gray">Roslem Hub Repository</h1>
              <p className="text-muted-foreground">Access and manage your Shell documents in one place</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Welcome, {user?.username}</span>
                  {user?.email && <TwoFactorBadge enabled={!!user.email} />}
                </div>
                {user?.email && <span className="text-sm text-muted-foreground">{user.email}</span>}
              </div>
              <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
          <FileRepository />
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
    </ProtectedRoute>
  )
}
