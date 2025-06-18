import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface TestimonialCardProps {
  name: string
  role: string
  company?: string
  content: string
  rating: number
  image: string
  className?: string
}

export function TestimonialCard({ name, role, company, content, rating, image, className = "" }: TestimonialCardProps) {
  return (
    <Card className={`overflow-hidden bg-card/80 backdrop-blur-sm hover-lift ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-sm text-muted-foreground">
              {role}
              {company ? `, ${company}` : ""}
            </p>
          </div>
        </div>

        <div className="flex mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} />
          ))}
        </div>

        <p className="text-muted-foreground italic">&ldquo;{content}&rdquo;</p>
      </CardContent>
    </Card>
  )
}
