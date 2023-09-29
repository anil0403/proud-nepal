import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
const storeId = process.env.STORE_ID

export async function POST(
  req: Request,
) {
  try {
    // const { userId } = auth();

    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      memorySlot,
      storage,
      StorageSlot,
      keyboard,
      camera,
      display,
      ethernet,
      wlanBluetooth,
      fingerPrint,
      powerAdapter,
      battery,
      ramId,
      stock,
      isFeatured,
      isArchived,
      isGaming,
      isOffice,
      isStudent,
      fbLink,
      tiktokLink,
      instaLink,
      freeItems,
      warranty,
      discount,
      newPrice,
      warrantyNew,
      coreId,
      r3,
      r5,
      r7,
      r9,

      ram2gb,
      ram4gb,
      ram6gb,
      ram8gb,
      ram16gb,
      ram32gb,
      ram64gb,
    } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        memorySlot,
        storage,
        StorageSlot,
        keyboard,
        camera,
        display,
        ethernet,
        wlanBluetooth,
        fingerPrint,
        powerAdapter,
        battery,
        ramId,
        stock,
        isFeatured,
        isArchived,
        isGaming,
        isOffice,
        isStudent,
        fbLink,
        tiktokLink,
        instaLink,
        freeItems,
        warranty,
        discount,
        warrantyNew,
        newPrice: price - discount,
        storeId: storeId,
        coreId,
        r3,
        r5,
        r7,
        r9,
  
        ram2gb,
        ram4gb,
        ram6gb,
        ram8gb,
        ram16gb,
        ram32gb,
        ram64gb,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,

) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const ramId = searchParams.get("ramId") || undefined;
    const coreId = searchParams.get("coreId") || undefined;

    const isFeatured = searchParams.get("isFeatured");
    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: storeId,
        categoryId,
        colorId,
        sizeId,
        ramId,
        coreId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
        ram: true,
        core: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
