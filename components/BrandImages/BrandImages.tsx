"use client"

import React from "react"
import { useRouter } from "next/navigation"

import useBrands from "@/hooks/UseBrands"

interface BrandImageProps {
  active?: boolean
  id?: string
}

const BrandImages = ({ active, id }: BrandImageProps) => {
  const router = useRouter()
  const { data: brands } = useBrands()

  return (
    <div className="flex  flex-wrap gap-5 lg:justify-between my-5  py-5 border-b-2">
      {brands?.map((brand: any) => (
        <h1
          onClick={() => router.push(`/brands/${brand?.id}`)}
          className={`text-4xl font-extrabold  hover:cursor-pointer hover:text-sky-700 hover:scale-105 transition-all ease-in-out ${
            brand?.id === id ? "text-sky-700" : "text-gray-800"
          } `}
        >
          {brand?.name}
        </h1>
      ))}

      {/* <h1 className="text-5xl font-extrabold text-gray-800 hover:cursor-pointer hover:text-gray-700 ">
        Acer
      </h1>
      <h1 className="text-5xl font-extrabold text-gray-800 hover:cursor-pointer hover:text-gray-700 ">
        Dell
      </h1>
      <h1 className="text-5xl font-extrabold text-gray-800 hover:cursor-pointer hover:text-gray-700 ">
        Hp
      </h1>
      <h1 className="text-5xl font-extrabold text-gray-800 hover:cursor-pointer hover:text-gray-700 ">
        Lenovo
      </h1>
      <h1 className="text-5xl font-extrabold text-gray-800 hover:cursor-pointer hover:text-gray-700 ">
        Samsung
      </h1> */}

      {/* <Image src={apple} height={100} alt="apple_logo" />
      <Image src={acer} height={100} alt="apple_logo" />
      <Image src={dell} height={100} alt="apple_logo" />
      <Image src={lenevo} height={100} alt="apple_logo" />
      <Image src={asus} height={100} alt="apple_logo" />
      <Image src={samsung} height={100} alt="apple_logo" />
      <Image src={hp} height={100} alt="apple_logo" /> */}
    </div>
  )
}

export default BrandImages
