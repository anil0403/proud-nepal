import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const { name, username, email, password, phone, address, billingAddress } =
    await request.json()

  console.log(`register data`)

  console.log(name, username, email, password, phone, address, billingAddress)

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (user)
    return NextResponse.json({ error: "user already exist" }, { status: 400 })

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await prisma.user.create({
    data: {
      name: name,
      username: username,
      email: email,
      phone: phone,
      hashedPassword: hashedPassword,
      address: address,
      billingAddress: billingAddress,
      isAdmin: false,
      isUser: true,
    },
  })

  return NextResponse.json(newUser, { status: 201 })
}
