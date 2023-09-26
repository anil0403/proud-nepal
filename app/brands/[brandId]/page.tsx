"use client"

import React from "react"

import useProducts from "@/hooks/useProducts"
import BrandImages from "@/components/BrandImages/BrandImages"
import ProductCard from "@/components/ProductCard/ProductCard"

interface BrandIdProps {
  params: { brandId: string }
}

const BrandId = ({ params: { brandId } }: BrandIdProps) => {
  const { data: products, isLoading } = useProducts()
  console.log(products)

  const brandProducts = products?.filter(
    (product: any) => product?.categoryId === brandId
  )

  console.log(brandProducts)

  console.log(brandId)
  return (
    <div>
      <BrandImages active id={brandId} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {brandProducts?.map((product: any) => (
          <ProductCard
            key={product?.id}
            product={product}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  )
}

export default BrandId
