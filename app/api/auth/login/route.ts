import { type NextRequest, NextResponse } from "next/server"

// Mock database for users - in a real app, this would be a database
const users = {
  iamgopaul: {
    email: "jgopa003@fiu.edu",
    passwordHash: "hashed_password123", // In a real app, this would be properly hashed
    username: "iamgopaul",
    name: "Josh Gopaul",
  },
  johndoe: {
    email: "john@example.com",
    passwordHash: "hashed_password123", // In a real app, this would be properly hashed
    username: "johndoe",
    name: "John Doe",
  },
}

// Email to username mapping for email login
const emailToUsername = {
  "jgopa003@fiu.edu": "iamgopaul",
  "john@example.com": "johndoe",
}

export async function POST(request: NextRequest) {
  try {
    const { login, password } = await request.json()

    // Check if login is email or username
    let username = login

    // If login looks like an email, try to find the corresponding username
    if (login.includes("@")) {
      username = emailToUsername[login]
      if (!username) {
        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
      }
    }

    const user = users[username]

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // In a real app, we would compare the password hash here
    // For now, we'll just check if the password is "password123"
    const isPasswordValid = password === "password123"

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    const token = Buffer.from(`${username}:${Date.now()}`).toString("base64")

    return NextResponse.json({
      success: true,
      token,
      user: {
        email: user.email,
        name: user.name,
        username: user.username,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
