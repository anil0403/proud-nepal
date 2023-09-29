import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

const storeId = process.env.STORE_ID

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { label, imageUrl } = body

    if (!label) {
      return new NextResponse("Label is required", { status: 400 })
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 })
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: storeId!,
      },
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    if (storeId) {
      return new NextResponse("Store id is required", { status: 400 })
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: storeId,
      },
    })

    return NextResponse.json(billboards)
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
