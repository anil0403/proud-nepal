import { NextRequest, NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

interface ProductIDProps {
  params: { productId: string }
}
export async function GET(
  request: NextRequest,
  { params: { productId } }: ProductIDProps
) {
  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      category: true,
      size: true,
      color: true,
      ram: true,
      images: true,
    },
  })
  return NextResponse.json(product)
}
