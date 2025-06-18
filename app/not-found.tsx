import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
        <div className="space-x-4">
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
          <Link href="/explore">
            <Button variant="outline">Explore Portfolios</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
