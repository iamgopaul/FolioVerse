import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ParallaxSection } from "@/components/parallax-section"
import { TestimonialCard } from "@/components/testimonial-card"
import { AnimatedBackground } from "@/components/animated-background"
import { ArrowRight, Users, Shield, Palette, ArrowDown } from "lucide-react"

export default function HomePage() {
  // Testimonials data
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "UX Designer",
      company: "DesignCraft",
      content:
        "FolioVerse helped me land my dream job! The sleek portfolio design impressed my interviewers and showcased my work perfectly.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100&text=AJ",
    },
    {
      name: "Sarah Miller",
      role: "Frontend Developer",
      company: "TechInnovate",
      content:
        "I've tried many portfolio platforms, but FolioVerse stands out with its clean design and powerful customization options. Highly recommended!",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100&text=SM",
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      content:
        "As someone who isn't design-savvy, FolioVerse made it incredibly easy to create a professional portfolio that highlights my technical skills.",
      rating: 4,
      image: "/placeholder.svg?height=100&width=100&text=MC",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground variant="tech" />

      {/* Hero Section with Parallax */}
      <ParallaxSection className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-8 text-center min-h-screen">
            <ScrollReveal>
              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                <span className="text-primary">FolioVerse</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl">
                Showcase your work. Connect with opportunities. Build your future.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Create Your Portfolio
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore Portfolios
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <a href="#discover" className="inline-flex items-center justify-center mt-12 animate-bounce">
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </ParallaxSection>

      {/* Features Section with Scroll Reveal */}
      <section id="discover" className="w-full py-24 md:py-32 bg-secondary/50 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 sm:text-4xl md:text-5xl">
              Craft Your Digital Identity
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ScrollReveal direction="up" delay={100}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Professional Showcase</h3>
                <p className="text-muted-foreground">
                  Stand out with a stunning portfolio that captures attention and showcases your unique talents.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Palette className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Effortless Customization</h3>
                <p className="text-muted-foreground">
                  Express your personal brand with custom backgrounds, layouts, and design elements.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={500}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Secure Community</h3>
                <p className="text-muted-foreground">
                  Connect with professionals in a secure environment designed for meaningful networking.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <ParallaxSection className="w-full py-24 md:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-16 sm:text-4xl md:text-5xl">
              Portfolios That Impress
            </h2>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square rounded-full bg-gradient-radial from-primary/20 to-transparent blur-3xl opacity-30" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              <ScrollReveal direction="left" delay={100} className="md:col-span-2 lg:col-span-1">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-primary/10">
                  <Image
                    src="/placeholder.svg?height=600&width=800&text=Designer+Portfolio"
                    alt="Designer Portfolio"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex items-end p-6">
                    <div>
                      <h3 className="font-semibold text-lg">Creative Designer</h3>
                      <p className="text-sm text-muted-foreground">Visual storytelling through design</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-primary/10">
                  <Image
                    src="/placeholder.svg?height=600&width=800&text=Developer+Portfolio"
                    alt="Developer Portfolio"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex items-end p-6">
                    <div>
                      <h3 className="font-semibold text-lg">Full-Stack Developer</h3>
                      <p className="text-sm text-muted-foreground">Building the digital future</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={500}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-primary/10">
                  <Image
                    src="/placeholder.svg?height=600&width=800&text=Data+Scientist+Portfolio"
                    alt="Data Scientist Portfolio"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex items-end p-6">
                    <div>
                      <h3 className="font-semibold text-lg">Data Scientist</h3>
                      <p className="text-sm text-muted-foreground">Insights through analytics</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Testimonials Section */}
      <section className="w-full py-24 md:py-32 bg-secondary/50 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-16 sm:text-4xl md:text-5xl">
              What Our Users Say
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 200}>
                <TestimonialCard {...testimonial} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ParallaxSection className="w-full py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-secondary/50 p-8 md:p-12">
            <div className="absolute inset-0 bg-grid-white/[0.02]" />

            <div className="relative z-10 flex flex-col items-center space-y-4 text-center max-w-3xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Showcase Your Talent?
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="text-muted-foreground md:text-xl">
                  Join thousands of professionals who've elevated their careers with FolioVerse portfolios.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={400} className="pt-4">
                <Link href="/signup">
                  <Button size="lg" className="group">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </ParallaxSection>
    </div>
  )
}
