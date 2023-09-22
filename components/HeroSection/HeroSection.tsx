"use client"

import React from "react"
import useProducts from "@/hooks/useProducts"
import ProductCard from "../ProductCard/ProductCard"


const HeroSection = () => {
  const { data: products, isLoading } = useProducts()
  // console.log(products)
  // console.log(products[0])
  // console.log(products[0])
  // const product = products[0]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-20">
      {products?.map((product: any) => (
        <ProductCard product={product} />
      ))}
    </div>
  )
}

export default HeroSection
