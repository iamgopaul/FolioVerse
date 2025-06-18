import { type NextRequest, NextResponse } from "next/server"

// Mock database for users - in a real app, this would be a database
const users: Record<string, any> = {
  iamgopaul: {
    username: "iamgopaul",
    name: "Josh Gopaul",
    email: "jgopa003@fiu.edu",
    passwordHash: "hashed_password123", // In a real app, this would be properly hashed
  },
  johndoe: {
    username: "johndoe",
    name: "John Doe",
    email: "john@example.com",
    passwordHash: "hashed_password123", // In a real app, this would be properly hashed
  },
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, username } = await request.json()

    // Validate required fields
    if (!name || !email || !password || !username) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Check if username already exists (case insensitive)
    const usernameExists = Object.keys(users).some(
      (existingUsername) => existingUsername.toLowerCase() === username.toLowerCase(),
    )

    if (usernameExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Username already taken. Please choose another username.",
        },
        { status: 400 },
      )
    }

    // Check if email already exists
    const emailExists = Object.values(users).some((user: any) => user.email.toLowerCase() === email.toLowerCase())

    if (emailExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered. Please use another email or login.",
        },
        { status: 400 },
      )
    }

    // In a real app, we would hash the password here
    const passwordHash = `hashed_${password}`

    // Create new user
    const newUser = {
      username,
      name,
      email,
      passwordHash,
    }

    // In a real app, save to database
    users[username] = newUser

    // Generate token
    const token = Buffer.from(`${username}:${Date.now()}`).toString("base64")

    return NextResponse.json({
      success: true,
      token,
      user: {
        username,
        name,
        email,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
