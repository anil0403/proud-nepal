import { NextRequest, NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function GET(request: NextRequest) {
  const brands = await prismadb.category.findMany({
    where: {
      storeId: "fa6cde03-6fd3-482f-bf79-c2a14ca3162f",
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return NextResponse.json(brands)
}
