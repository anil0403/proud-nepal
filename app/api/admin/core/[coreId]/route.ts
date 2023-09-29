import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"

const storeId = process.env.STORE_ID

export async function GET(
  req: Request,
  { params }: { params: { coreId: string } }
) {
  try {
    if (!params.coreId) {
      return new NextResponse("core id is required", { status: 400 })
    }

    const core = await prismadb.core.findUnique({
      where: {
        id: params.coreId,
      },
    })

    return NextResponse.json(core)
  } catch (error) {
    console.log("[core_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { coreId: string } }
) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!params.coreId) {
      return new NextResponse("core id is required", { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        // userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 })
    }

    const core = await prismadb.core.delete({
      where: {
        id: params.coreId,
      },
    })

    return NextResponse.json(core)
  } catch (error) {
    console.log("[core_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { coreId: string } }
) {
  try {
    // const { userId } = auth();

    const body = await req.json()

    const { core, thread } = body

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!core) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!thread) {
      return new NextResponse("Value is required", { status: 400 })
    }

    if (!params.coreId) {
      return new NextResponse("core id is required", { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        // userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 })
    }

    const updatedCore = await prismadb.core.update({
      where: {
        id: params.coreId,
      },
      data: {
        core,
        thread,
      },
    })

    return NextResponse.json(updatedCore)
  } catch (error) {
    console.log("[core_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
