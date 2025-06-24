"use client"

import { useFormState, useFormStatus } from "react-dom"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2 } from "lucide-react"
import { sendContactEmail, type ContactFormState } from "@/app/actions/send-email"
import { AnimatedBackground } from "@/components/animated-background"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Sending...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Send className="h-4 w-4" />
          Send Message
        </span>
      )}
    </Button>
  )
}

export default function ContactPage() {
  const initialState: ContactFormState = { success: false, message: "" }
  const [state, formAction] = useFormState(sendContactEmail, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset() // Reset form fields on successful submission
    }
  }, [state])

  return (
    <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 relative">
      <AnimatedBackground variant="business" />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 relative z-10">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h1>
          <p className="text-muted-foreground">
            I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out!
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:jgopa003@fiu.edu" className="hover:underline">
                jgopa003@fiu.edu
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+19546438379" className="hover:underline">
                1(954)643-8379
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Miami, Florida</span>
            </div>
          </div>
          <div className="pt-8">
            <h2 className="text-xl font-semibold mb-4">Follow Me</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" asChild>
                <a href="https://github.com/iamgopaul" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.linkedin.com/in/iamgopaul/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://x.com/iamgopaul/" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.instagram.com/i.am.gopaul/" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card/80 backdrop-blur-sm p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Send Me a Message</h2>
          <form ref={formRef} action={formAction} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" required />
                {state?.errors?.name && (
                  <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle size={14} /> {state.errors.name[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Your email" required />
                {state?.errors?.email && (
                  <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle size={14} /> {state.errors.email[0]}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" placeholder="Subject of your message" required />
              {state?.errors?.subject && (
                <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle size={14} /> {state.errors.subject[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Your message" className="min-h-[150px]" required />
              {state?.errors?.message && (
                <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle size={14} /> {state.errors.message[0]}
                </p>
              )}
            </div>

            <SubmitButton />

            {state?.message && (
              <div
                className={`mt-4 p-3 rounded-md text-sm flex items-center gap-2 ${
                  state.success
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                }`}
              >
                {state.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {state.message}
              </div>
            )}
            {state?.errors?.general && (
              <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1 mt-2">
                <AlertCircle size={14} /> {state.errors.general[0]}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
