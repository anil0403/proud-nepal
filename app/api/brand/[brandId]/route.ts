import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

import prismadb from "@/lib/prismadb"

interface BrandIdProps {
  params: { brandId: string }
}

export async function GET(
  request: NextRequest,
  { params: { brandId } }: BrandIdProps
) {
  const brand = await prismadb.category.findUnique({
    where: {
      id: brandId,
    },
  })
  return NextResponse.json(brand)
}
