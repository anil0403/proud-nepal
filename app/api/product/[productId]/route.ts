import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

interface ProductIDProps {
  params: { productId: string }
}

export async function GET(
  request: NextRequest,
  { params: { productId } }: ProductIDProps
) {
  const product = await axios.get(
    `https://proud-nepal-admin.vercel.app/api/fa6cde03-6fd3-482f-bf79-c2a14ca3162f/products/${productId}`
  )
  // console.log(product)
  return NextResponse.json(product.data)
}
