import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { name, email, username, password } = await req.json()

  // Check for missing fields
  if (!name || !email || !username || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 })
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      username,
      password: hashedPassword,
    },
  })

  return NextResponse.json({ user }, { status: 201 })
}

