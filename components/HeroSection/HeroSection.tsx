"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"

import useBillboards from "@/hooks/useBillboard"
import useProducts from "@/hooks/useProducts"

import lenevo from "../../public/images/160-1607297_lenovo-logo-svg-hd-png-download.png"
import dell from "../../public/images/208-2087029_dell-logo-png-transparent-png-download.png"
import samsung from "../../public/images/256_144_1.avif"
import asus from "../../public/images/20171002_asus_logo.jpg"
import acer from "../../public/images/Acer-logo.jpg"
import apple from "../../public/images/e49986bfb34b23c4354477ce1acb49e0.jpg"
import ProductCard from "../ProductCard/ProductCard"
import ImageSlider from "./ImageSlider"
import ProductCardSection from "./ProductCardSection"

const texts = [
  "Your Trusted Laptop Store",
  "Best Laptop",
  "In Affordable Price",
]
// const images = [
//   "/path-to-image1.jpg",
//   "/path-to-image2.jpg",
//   "/path-to-image3.jpg",
//   "/path-to-image3.jpg",
//   "/path-to-image3.jpg",
//   "/path-to-image3.jpg",
//   "/path-to-image3.jpg",
//   "/path-to-image3.jpg",
//   "/path-to-image3.jpg",
//   "/path-to-image3.jpg",
//   "/path-to-image3.jpg",
//   "/path-to-image3.jpg",
//   "/path-to-image3.jpg",
//   "/path-to-image3.jpg",
//   // ... add more images as needed
// ]

const HeroSection = () => {
  const { data: products } = useProducts()
  const { data: billboards, isLoading } = useBillboards()
  const images =
    billboards === undefined
      ? []
      : billboards.map((billboard: any) => billboard.imageUrl)

  const [index, setIndex] = useState(0)
  const [message, setMessage] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && message === texts[index]) {
      setTimeout(() => setIsDeleting(true), 500)
    } else if (isDeleting && message === "") {
      setIsDeleting(false)
      setIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }

    const timer = setTimeout(() => {
      setMessage((prevValue) => {
        if (isDeleting) {
          return prevValue.substring(0, prevValue.length - 1)
        }
        return texts[index].substring(0, prevValue.length + 1)
      })
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [message, isDeleting, index])
  return (
    <div className="w-full">
      <div className=" my-10 min-w-content flex flex-col gap-20">
        <div className="grid grid-cols-1 md:grid-cols-5 items-center  justify-between">
          <div className="col-span-2 flex flex-col  items-center justify-center pr-10">
            <h1 className="text-4xl font-extrabold my-5 text-center">
              Proud Nepal
              <p className="text-xl font-semibold text-center">IT Suppliers</p>
            </h1>
            <div className="  font-mono  text-center text-xl">
              {message}
              <span className="text-red-500 ">|</span>
            </div>
            <h2 className="font-semibold my-5 text-center">
              Your One-stop destination For Laptops
            </h2>
            <p className="text-center ">
              Putalisadak, Dhobidhara Marg, Kathmandu, Nepal
            </p>
          </div>

          {isLoading ? null : (
            <div className="hidden md:col-span-3 md:block">
              <ImageSlider images={images} />
            </div>
          )}
        </div>

        <div className="hidden lg:flex gap-10 flex-wrap justify-between my-10">
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

// Proud Nepal IT Suppliers - Your Trusted Laptop Store

// "Proud Nepal IT Suppliers is your one-stop destination for laptops of all
// brands. Experience the best customer service and find the perfect
// laptop that suits your needs and budget."

// "Laptops, Nepal IT
// Suppliers, Laptop Brands, Trusted Laptop Store, Nepal, IT Products,
// best Cost Laptop,

// Laptop in best pirce,
// Laptop in best pirce in Nepal,
// Laptop in best pirce, Laptop in best pirce in Nepal"
// "Proud Nepal IT Suppliers - Your Trusted Laptop Store"

// Proud Nepal IT Suppliers offers a wide range of laptops from various brands, catering
// to all your computing needs. Find the perfect laptop with us today!"

{
  /* <div>
Proud Nepal IT Suppliers - Your Trusted Laptop Store "Proud Nepal IT
Suppliers is your one-stop destination for laptops of all brands.
Experience the best customer service and find the perfect laptop that
suits your needs and budget." "Laptops, Nepal IT Suppliers, Laptop
Brands, Trusted Laptop Store, Nepal, IT Products, best Cost Laptop,
Laptop in best pirce, Laptop in best pirce in Nepal, Laptop in best
pirce, Laptop in best pirce in Nepal" "Proud Nepal IT Suppliers - Your
Trusted Laptop Store" Proud Nepal IT Suppliers offers a wide range of
laptops from various brands, catering to all your computing needs.
Find the perfect laptop with us today!"
</div> */
}
