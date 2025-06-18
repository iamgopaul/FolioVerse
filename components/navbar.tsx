"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, Settings, User } from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken")
      const user = localStorage.getItem("currentUser")
      setIsAuthenticated(!!token)
      setCurrentUser(user)
    }
  }, [pathname])

  const routes = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            FolioVerse
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === route.href ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}

          {isAuthenticated && (
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
          )}

          <Button variant="ghost" size="icon" onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isAuthenticated ? (
            <>
              <Link href={`/${currentUser}`}>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">My Portfolio</span>
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          )}
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-top md:hidden bg-background">
            <div className="flex flex-col space-y-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={closeMenu}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    pathname === route.href ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {route.label}
                </Link>
              ))}

              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  Dashboard
                </Link>
              )}

              {isAuthenticated ? (
                <>
                  <Link href={`/${currentUser}`} onClick={closeMenu}>
                    <Button variant="ghost" size="sm" className="justify-start">
                      <User className="mr-2 h-4 w-4" />
                      My Portfolio
                    </Button>
                  </Link>
                  <Link href="/settings" onClick={closeMenu}>
                    <Button variant="ghost" size="sm" className="justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/login" onClick={closeMenu}>
                  <Button className="justify-start">Sign In</Button>
                </Link>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
                className="justify-start"
              >
                <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span>Toggle theme</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
