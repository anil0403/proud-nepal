import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: "fa6cde03-6fd3-482f-bf79-c2a14ca3162f",
    },
    include: {
      category: true,
      size: true,
      color: true,
      ram: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured ?? false,
    isArchived: item.isArchived ?? false,
    price: item.price,
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    stock: item.stock,
    ram: item.ram.value,
    storage: item.storage,
    fingerPrint: item.fingerPrint,
    dsiplay: item.display,
    camera: item.camera,
    wlanBluetooth: item.wlanBluetooth,
    battery: item.battery,
    powerAdapter: item.powerAdapter,
    newPrice: item.newPrice,
    discount: item.discount,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
