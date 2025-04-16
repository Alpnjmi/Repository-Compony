"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, LogIn } from "lucide-react"
import { TwoFactorBadge } from "@/components/two-factor-badge"

export function ShellHeader() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <header className="w-full bg-shell-red border-b border-shell-darkred">
      <div className="container mx-auto py-4 px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 mr-2">
              <img src="/images/shell-logo.png" alt="Roslem Hub logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-white text-xl font-bold">Roslem Hub Repository</span>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className={`text-white hover:text-shell-yellow transition-colors ${
                  pathname === "/" ? "font-bold" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/repository"
                className={`text-white hover:text-shell-yellow transition-colors ${
                  pathname === "/repository" ? "font-bold" : ""
                }`}
              >
                Repository
              </Link>
              <Link
                href="/contact"
                className={`text-white hover:text-shell-yellow transition-colors ${
                  pathname === "/contact" ? "font-bold" : ""
                }`}
              >
                Contact Us
              </Link>
              <Link href="#" className="text-white hover:text-shell-yellow transition-colors">
                Help
              </Link>
            </nav>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-white hidden md:inline">Welcome, {user.username}</span>
                  {user.email && (
                    <div className="hidden md:flex items-center gap-2">
                      <span className="text-white text-xs opacity-80">{user.email}</span>
                      <TwoFactorBadge enabled={!!user.email} />
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="bg-transparent border-white text-white hover:bg-white/10 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="bg-transparent border-white text-white hover:bg-white/10 flex items-center gap-2"
              >
                <Link href="/login">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden md:inline">Login</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
