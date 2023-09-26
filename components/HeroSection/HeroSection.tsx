"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"

import useProducts from "@/hooks/useProducts"

import BrandImages from "../BrandImages/BrandImages"
import ImageSlider from "./ImageSlider"
import ProductCardSection from "./ProductCardSection"
import TypeWriter from "./Typewriter"

const texts = [
  "Your Trusted Laptop Store",
  "Best Laptop",
  "In Affordable Price",
]

const HeroSection = () => {
  const { data: products, isLoading } = useProducts()

  return (
    <div className="w-full">
      <div className=" my-12 py-10 min-w-content flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-5 items-center  justify-between">
          <TypeWriter />

          <div className="hidden md:col-span-3 md:block">
            <ImageSlider />
          </div>
        </div>
        <BrandImages />
      </div>
      <ProductCardSection products={products} isLoading={isLoading} />
    </div>
  )
}

export default HeroSection
