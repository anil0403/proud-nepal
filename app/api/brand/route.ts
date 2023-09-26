import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function GET(request: NextRequest) {
  const brands = await axios.get(
    "https://proud-nepal-admin.vercel.app/api/fa6cde03-6fd3-482f-bf79-c2a14ca3162f/categories"
  )
  return NextResponse.json(brands.data)
}
