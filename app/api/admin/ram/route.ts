import { NextResponse } from "next/server";

const storeId = process.env.STORE_ID

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    const ram = await prismadb.ram.create({
      data: {
        name,
        value,
        storeId: storeId,
      },
    });

    return NextResponse.json(ram);
  } catch (error) {
    console.log("[ramS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
) {
  try {
    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const rams = await prismadb.ram.findMany({
      where: {
        storeId: storeId,
      },
    });

    return NextResponse.json(rams);
  } catch (error) {
    console.log("[ramS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
