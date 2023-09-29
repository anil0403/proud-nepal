import prismadb from "@/lib/prismadb"

import { ProductForm } from "./components/product-form"

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string }
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  })

  const categories = await prismadb.category.findMany({
    where: {
      storeId: "fa6cde03-6fd3-482f-bf79-c2a14ca3162f",
    },
  })

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: "fa6cde03-6fd3-482f-bf79-c2a14ca3162f",
    },
  })

  const colors = await prismadb.color.findMany({
    where: {
      storeId: "fa6cde03-6fd3-482f-bf79-c2a14ca3162f",
    },
  })

  const rams = await prismadb.ram.findMany({
    where: {
      storeId: "fa6cde03-6fd3-482f-bf79-c2a14ca3162f",
    },
  })

  const cores = await prismadb.core.findMany({
    where: {
      storeId: "fa6cde03-6fd3-482f-bf79-c2a14ca3162f",
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          rams={rams}
          cores={cores}
          initialData={product}
        />
      </div>
    </div>
  )
}

export default ProductPage
