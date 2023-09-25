"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"

import useProducts from "@/hooks/useProducts"

import lenevo from "../../public/images/160-1607297_lenovo-logo-svg-hd-png-download.png"
import dell from "../../public/images/208-2087029_dell-logo-png-transparent-png-download.png"
import samsung from "../../public/images/256_144_1.avif"
import asus from "../../public/images/20171002_asus_logo.jpg"
import acer from "../../public/images/Acer-logo.jpg"
import apple from "../../public/images/e49986bfb34b23c4354477ce1acb49e0.jpg"
import ImageSlider from "./ImageSlider"
import ProductCardSection from "./ProductCardSection"
import TypeWriter from "./Typewriter"

const texts = [
  "Your Trusted Laptop Store",
  "Best Laptop",
  "In Affordable Price",
]

const HeroSection = () => {
  const { data: products } = useProducts()

  return (
    <div className="w-full">
      <div className=" my-16 min-w-content flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-5 items-center  justify-between">
          <TypeWriter />

          <div className="hidden md:col-span-3 md:block">
            <ImageSlider />
          </div>
        </div>

        <div className="hidden lg:flex gap-10 flex-wrap justify-between my-5">
          <Image src={apple} height={100} alt="apple_logo" />
          <Image src={acer} height={100} alt="apple_logo" />
          <Image src={dell} height={100} alt="apple_logo" />
          <Image src={lenevo} height={100} alt="apple_logo" />
          <Image src={asus} height={100} alt="apple_logo" />
          <Image src={samsung} height={100} alt="apple_logo" />
        </div>
      </div>
      <ProductCardSection products={products} />
    </div>
  )
}

export default HeroSection
