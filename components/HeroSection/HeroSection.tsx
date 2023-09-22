"use client"

import React from "react"

import useProducts from "@/hooks/useProducts"

import ProductCard from "../ProductCard/ProductCard"
import ProductCardSection from "./ProductCardSection"

const HeroSection = () => {
  const { data: products, isLoading } = useProducts()
  // console.log(products)
  // console.log(products[0])
  // console.log(products[0])
  // const product = products[0]
  return (
    <div>
      <ProductCardSection products={products} />
    </div>
  )
}

export default HeroSection
