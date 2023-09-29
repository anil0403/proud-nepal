import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
const storeId = process.env.STORE_ID

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
        ram: true,
        core: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
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

    const product = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string} }
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
      images,
      coreId,
      warrantyNew,

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

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

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

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        // userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        coreId,
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
        images: {
          deleteMany: {},
        },
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
        newPrice: price - discount,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
