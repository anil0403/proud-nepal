"use client"

import React, { useEffect, useState } from "react"

import useProductId from "@/hooks/useProductId"
import useProducts from "@/hooks/useProducts"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import CopyButton from "@/components/ProductCard/Copy"
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
  const mainImageUrl = product?.images?.[0]?.url

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
  }, [mainImageUrl, product])
  // console.log("Similarity  = ", similarity)
  return (
    <div className="relative flex flex-col justify-center my-10">
      <h2 className="text-center font-bold md:hidden mb-4">
        {product?.name} {product?.size.name} {product?.size.value}{" "}
      </h2>
      {/* Product Display */}
      <div className="flex flex-wrap">
        {/* Left Side: Images */}
        <div className="w-full md:w-1/2 px-1 pt-0">
          <div className=" mb-4">
            {/* <Image src={mainImage} width={400} height={400} alt="Main Product"/> */}
            <img
              src={mainImage}
              alt="Main Product"
              className=" mx-auto w-[400px] h-[400px] p-3  md:w-[600px] md:h-[600px] aspect-auto object-contain object-center rounded-lg shadow-inner transition-opacity mb-4 border-2"
            />
          </div>
          <div className="flex flex-wrap  items-center justify-center p-5 gap-5">
            {product?.images?.map((img: any, index: any) => {
              return (
                <img
                  src={img.url}
                  alt={`Product Thumbnail ${index + 1}`}
                  className=" h-28 w-28  object-contain object-center rounded-lg shadow-md  transition-transform hover:shadow-lg hover:scale-105 cursor-pointer"
                  onClick={() => setMainImage(img.url)}
                />
              )
            })}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2  pt-0">
          <Card>
            <CardHeader>
              <CardTitle>
                <h2>
                  {product?.category?.name} {product?.name} |{" "}
                  {product?.size?.name} {product?.size.value} |{" "}
                  {product?.ram?.value} {product?.ram?.name}
                </h2>
              </CardTitle>
              <CardDescription>
                <ul className="flex flex-col gap-3 my-2 list-disc mx-4">
                  <li>
                    {product?.category?.name} {product?.name}
                  </li>
                  <li>
                    {product?.size?.name} {product?.size.value}
                  </li>
                  <li>
                    {product?.ram?.value} {product?.ram?.name}
                  </li>
                  <li>
                    {product?.color?.name} {product?.color?.value}
                  </li>
                  <li>{product?.display}</li>

                  <li>{product?.waarantyNew}</li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h2 className="text-red-800 font-bold my-4">
                Free Items : {product?.freeItems}
              </h2>
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
            </CardContent>
            <CardFooter>
              <div className="mt-6 flex flex-wrap gap-5">
                <label htmlFor="quantity" className="mr-4 text-gray-700">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e: any) => setQuantity(e.target.value)}
                  className="border rounded-lg p-2 mr-6 w-24 text-center transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:ring-opacity/50"
                />
                {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transform transition-transform hover:scale-105 shadow-md hover:shadow-lg">
              {alert}
            </button> */}
                <Button onClick={() => setAlert("Added")} size="lg">
                  {alert}
                </Button>

                <CopyButton
                  id={product?.id}
                  label="Copy Link"
                  message="Product Link copied to clipboard."
                />
              </div>
            </CardFooter>
          </Card>

          <h1 className="text-2xl font-bold mb py-4"></h1>

          <h1 className="text-center text-xl font-bold bg-yellow-500 text-white my-10 py-3">
            We Offer Free Delivery All Over The Nepal!
          </h1>
        </div>
      </div>

      <div className="my-5 py-10 border-y-2">
        <h2 className="font-semibold text-xl">Full Specification</h2>
        <Table className="my-5">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]  font-medium">S.N</TableHead>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Specification</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>{product?.category?.name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>Device Name</TableCell>
              <TableCell>{product?.name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>Processor</TableCell>
              <TableCell>
                {product?.size?.name} {product?.size?.value}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>RAM | Memory</TableCell>
              <TableCell>
                {" "}
                {product?.ram?.value} {product?.ram.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>5</TableCell>
              <TableCell>RAM | Memory Slot</TableCell>
              <TableCell>{product?.memorySlot}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>6</TableCell>
              <TableCell>Storage</TableCell>
              <TableCell>{product?.storage}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>7</TableCell>
              <TableCell>Storage Slot</TableCell>
              <TableCell>{product?.StorageSlot}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>8</TableCell>
              <TableCell>Graphics</TableCell>
              <TableCell>
                {product?.color.name} {product?.color?.value}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>9</TableCell>
              <TableCell>Display</TableCell>
              <TableCell>{product?.display}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>10</TableCell>
              <TableCell>Camera</TableCell>
              <TableCell>{product?.camera}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>11</TableCell>
              <TableCell>Fingerprint Sensor</TableCell>
              <TableCell>{product?.fingerPrint}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>12</TableCell>
              <TableCell>Keyboard</TableCell>
              <TableCell>{product?.keyboard}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>13</TableCell>
              <TableCell>Battery</TableCell>
              <TableCell>{product?.battery}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>14</TableCell>
              <TableCell>Power Adapter</TableCell>
              <TableCell>{product?.powerAdapter}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>15</TableCell>
              <TableCell>Wireless</TableCell>
              <TableCell>{product?.wlanBluetooth}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>16</TableCell>
              <TableCell>Ethernet</TableCell>
              <TableCell>{product?.ethernet}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
