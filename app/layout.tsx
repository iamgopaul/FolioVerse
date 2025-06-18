import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIChatbot } from "@/components/ai-chatbot"
import { CustomBackground } from "@/components/custom-background"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FolioVerse - Showcase Your Portfolio",
  description:
    "The ultimate platform for creating and discovering amazing portfolios from developers, designers, and creators around the world.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <CustomBackground />
            <Navbar />
            {children}
            <Footer />
            <AIChatbot />
            <Toaster position="top-right" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
