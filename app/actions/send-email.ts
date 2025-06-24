"use server"

import { z } from "zod"
import { Resend } from "resend"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters long." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
})

export interface ContactFormState {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
    general?: string[]
  }
}

export async function sendContactEmail(
  prevState: ContactFormState | undefined,
  formData: FormData
): Promise<ContactFormState> {
  const rawFormData = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    subject: formData.get("subject")?.toString() || "",
    message: formData.get("message")?.toString() || "",
  }

  const validatedFields = contactFormSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check your input.",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, subject, message } = validatedFields.data

  // Make sure the API key exists
  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY in environment variables.")
    return {
      success: false,
      message: "Server misconfiguration. Please try again later.",
      errors: { general: ["Missing email service configuration."] },
    }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev", // ✅ Verified sender
      to: ["jgopa003@fiu.edu"],       // ✅ Replace with your receiving email
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return {
        success: false,
        message: "Failed to send email. Please try again later.",
        errors: { general: ["Email service provider error."] },
      }
    }

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      errors: { general: ["Unexpected server error."] },
    }
  }
}

