import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
const storeId = process.env.STORE_ID
 
export async function POST(
  req: Request,
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
        // userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: storeId
      }
    });
  
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLORS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  // { params }: { params: { storeId: string } }
) {
  try {
    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const colors = await prismadb.color.findMany({
      where: {
        storeId: storeId
      }
    });
  
    return NextResponse.json(colors);
  } catch (error) {
    console.log('[COLORS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
