import { NextRequest, NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

export async function GET(request: NextRequest) {
  const processors = await prismadb.size.findMany({
    where: {
      storeId: "fa6cde03-6fd3-482f-bf79-c2a14ca3162f",
    },
  })
  return NextResponse.json(processors)
}
