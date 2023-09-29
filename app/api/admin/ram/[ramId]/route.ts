import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";


const storeId = process.env.STORE_ID

export async function GET(
  req: Request,
  { params }: { params: { ramId: string } }
) {
  try {
    if (!params.ramId) {
      return new NextResponse("Ram id is required", { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.ramId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[Ran_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { ramId: string } }
) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!params.ramId) {
      return new NextResponse("Ran id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        // userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const size = await prismadb.size.delete({
      where: {
        id: params.ramId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[Ran_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { ramId: string} }
) {
  try {
    // const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!params.ramId) {
      return new NextResponse("Ram id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        // userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const size = await prismadb.size.update({
      where: {
        id: params.ramId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[RAM_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
