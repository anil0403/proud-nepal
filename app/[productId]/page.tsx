"use client"

import React, { useEffect, useState } from "react"

import useProductId from "@/hooks/useProductId"
import useProducts from "@/hooks/useProducts"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/ProductCard/ProductCard"

interface ProductIdProps {
  params: { productId: string }
}
const ProductId = ({ params: { productId } }: ProductIdProps) => {
  const { data: product } = useProductId(productId)
  const { data: products } = useProducts()
  const [alert, setAlert] = useState("Add to Cart")
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(product?.images?.[0]?.url || "")
  const [similarity, Setsimilarity] = useState("")
  useEffect(() => {
    Setsimilarity(
      product?.isOffice
        ? "isOffice"
        : product?.isGaming
        ? "isGaming"
        : product?.isStudent
        ? "isStudent"
        : ""
    )
    setMainImage(product?.images?.[0]?.url)
  }, [product?.images?.[0]?.url, product])
  console.log("Similarity  = ", similarity)
  return (
    <div className="relative flex flex-col justify-center my-10">
      {/* Product Display */}
      <div className="flex flex-wrap">
        {/* Left Side: Images */}
        <div className="w-full md:w-1/2 p-4 pt-0">
          <div className="mb-6">
            {/* <Image src={mainImage} width={400} height={400} alt="Main Product"/> */}
            <img
              src={mainImage}
              alt="Main Product"
              className="mx-auto w-[400px] h-[400px] md:w-[800px] md:h-[800px] aspect-auto object-contain object-center rounded-lg shadow-inner transition-opacity"
            />
          </div>
          <div className="flex flex-wrap">
            {product?.images?.map((img: any, index: any) => {
              return (
                <div key={index} className="w-1/3 px-2">
                  <img
                    src={img.url}
                    alt={`Product Thumbnail ${index + 1}`}
                    className="w-full h-36 aspect-auto object-cover object-center rounded-lg shadow-md transform transition-transform hover:shadow-lg hover:scale-105 cursor-pointer"
                    onClick={() => setMainImage(img.url)}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-4 pt-0">
          <h1 className="text-2xl font-bold mb py-4">
            {product?.category?.name} {product?.name}
          </h1>
          <p className="mb-2 text-gray-600">
            <strong>Processor:</strong> {product?.size?.name}
            {product?.size?.value}
            {product?.core && (
              <span>
                | {product?.core?.core} {product?.core?.thread}
              </span>
            )}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>RAM:</strong> {product?.ram?.name} {product?.ram?.value}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Graphics:</strong> {product?.color?.name}{" "}
            {product?.color?.value}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Storage:</strong> {product?.storage}{" "}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>WIFI | Bluetooth:</strong> {product?.wlanBluetooth}{" "}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Camera:</strong> {product?.camera}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Display:</strong> {product?.display}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Fingerprint:</strong> {product?.fingerPrint}{" "}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Keyboard:</strong> {product?.keyboard}{" "}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Ethernet:</strong> {product?.ethernet}{" "}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Battery:</strong> {product?.battery}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Power Adapter:</strong> {product?.powerAdapter}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Memory Slot:</strong> {product?.memorySlot}
            {product?.ram?.value}
          </p>{" "}
          <p className="mb-2 text-gray-600">
            <strong>Storage Slot:</strong> {product?.StorageSlot}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Free Items:</strong> {product?.freeItems}
          </p>
          <p className="mb-6 text-sky-500 font-bold text-3xl">
            {product?.discount && product?.discount > 0 && (
              <span className="line-through text-red-700 text-sm">
                Rs{" "}
                {new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(product?.price || 0)}
              </span>
            )}
            <p>
              Rs{" "}
              {new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(product?.newPrice || 0)}
            </p>
          </p>
          <div className="mt-6 flex items-center">
            <label htmlFor="quantity" className="mr-4 text-gray-700">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e: any) => setQuantity(e.target.value)}
              className="border rounded-lg p-2 mr-6 w-24 text-center transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
            />
            {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transform transition-transform hover:scale-105 shadow-md hover:shadow-lg">
              {alert}
            </button> */}
            <Button onClick={() => setAlert("Added")} size="lg">
              {alert}
            </Button>
          </div>
          <h1 className="text-center text-xl font-bold bg-yellow-500 text-white my-10 py-4">
            We Offer Free Delivery All Over The Nepal!
          </h1>
        </div>
      </div>

      {/* Similar Products */}
      <div className="my-12 p-5">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Similar Products
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
            {products?.map((item: any) =>
              item?.isArchived ? null : similarity ? (
                <ProductCard key={item?.id} product={item} />
              ) : null
            )}
          </div>
        </h2>
      </div>
    </div>
  )
}

export default ProductId
