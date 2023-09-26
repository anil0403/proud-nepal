import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

interface BrandIdProps {
  params: { brandId: string }
}

export async function GET(
  request: NextRequest,
  { params: { brandId } }: BrandIdProps
) {
  const brand = await axios.get(
    `https://proud-nepal-admin.vercel.app/api/fa6cde03-6fd3-482f-bf79-c2a14ca3162f/categories/${brandId}`
  )
  // console.log(brand)
  return NextResponse.json(brand.data)
}
