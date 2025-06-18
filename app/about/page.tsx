import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileText, MapPin, GraduationCap, Briefcase } from "lucide-react"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"

export default function AboutPage() {
  return (
    <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 relative">
      <AnimatedBackground variant="creative" />
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] relative z-10">
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Me</h1>
          <div className="space-y-4 text-gray-500 dark:text-gray-400">
            <p>
              Hello! I'm Josh Gopaul, a passionate Computer Science graduate student at Florida International University
              with a focus on Artificial Intelligence and Machine Learning. My journey in tech began during my
              undergraduate studies at the University of the West Indies, where I graduated with Upper Second-Class
              Honors.
            </p>
            <p>
              I specialize in full-stack development, AI/ML model development, and cybersecurity. My experience ranges
              from building intelligent applications that can predict medical conditions to developing comprehensive web
              platforms that connect people and solve real-world problems.
            </p>
            <p>
              When I'm not coding or training models, you can find me exploring new technologies, contributing to
              open-source projects, or mentoring fellow students. I believe in continuous learning and pushing the
              boundaries of what's possible with technology.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Education</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="font-medium text-foreground">MSc Computer Science</div>
                    <div>Florida International University (2024-2026)</div>
                    <div>Current GPA: 3.83</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">BSc Computer Science with Management</div>
                    <div>University of the West Indies (2020-2023)</div>
                    <div>GPA: 3.36 (Upper Second-Class Honors)</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Experience</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="font-medium text-foreground">IT Support Assistant</div>
                    <div>Gopaul and Company LTD (2023-2024)</div>
                    <div>Resolved 50+ software issues, improved efficiency by 15%</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Treasurer</div>
                    <div>UWI Computer Society (2022-2023)</div>
                    <div>Managed $1,000 budget across 5 events</div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tighter pt-4 text-foreground">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Programming Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {["Python", "Java", "JavaScript", "TypeScript", "C/C++", "SQL"].map((skill) => (
                    <span key={skill} className="rounded-md bg-primary/10 text-primary px-2 py-1 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">AI/ML & Data Science</h3>
                <div className="flex flex-wrap gap-2">
                  {["TensorFlow", "PyTorch", "Scikit-learn", "pandas", "NumPy", "MLflow"].map((skill) => (
                    <span key={skill} className="rounded-md bg-primary/10 text-primary px-2 py-1 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Web Development</h3>
                <div className="flex flex-wrap gap-2">
                  {["React.js", "Next.js", "Node.js", "Express.js", "FastAPI"].map((skill) => (
                    <span key={skill} className="rounded-md bg-primary/10 text-primary px-2 py-1 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Cloud & DevOps</h3>
                <div className="flex flex-wrap gap-2">
                  {["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"].map((skill) => (
                    <span key={skill} className="rounded-md bg-primary/10 text-primary px-2 py-1 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Databases</h3>
                <div className="flex flex-wrap gap-2">
                  {["PostgreSQL", "MongoDB", "MySQL", "Firebase", "Redis"].map((skill) => (
                    <span key={skill} className="rounded-md bg-primary/10 text-primary px-2 py-1 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Security</h3>
                <div className="flex flex-wrap gap-2">
                  {["Penetration Testing", "Burp Suite", "Wireshark", "Cybersecurity"].map((skill) => (
                    <span key={skill} className="rounded-md bg-primary/10 text-primary px-2 py-1 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <Link href="/resume">
                <Button className="inline-flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  View Resume
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="inline-flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-2xl"></div>
            <Image
              src="/images/profile.jpg"
              width={400}
              height={400}
              alt="Josh Gopaul"
              className="relative w-full h-auto aspect-square overflow-hidden rounded-xl object-cover border-2 border-primary/20"
            />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold">Josh Gopaul</h3>
            <p className="text-muted-foreground">Computer Science Graduate Student</p>
            <p className="text-sm text-muted-foreground">Florida International University</p>
          </div>
        </div>
      </div>
    </div>
  )
}
