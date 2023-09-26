"use client"
import React from "react"

import useProducts from "@/hooks/useProducts"
import BrandImages from "@/components/BrandImages/BrandImages"
import ProductCard from "@/components/ProductCard/ProductCard"

const Brands = () => {
  const { data: products, isLoading } = useProducts()
  return (
    <div>
      <BrandImages />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {products?.map((product: any) => (
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

export default Brands
