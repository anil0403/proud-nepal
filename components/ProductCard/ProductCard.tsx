import React from "react"
import { Pridi } from "next/font/google"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import CopyButton from "./Copy"

interface ProductCardProps {
  product: any
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter()
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 onClick={() => router.push(`${product?.id}`)}>{product.name}</h2>{" "}
        </CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center">
          <Image
            src={product?.images[0].url}
            width={200}
            height={150}
            alt="thumbnail"
            className="hover:scale-110 transition-all  ease-in-out hover:cursor-pointer"
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className=" w-full flex flex-col gap-5 border-t-2 pt-4">
          <div>
            <p className="text-sm">
              {" "}
              {product?.size.name} | {product?.ram.value} {product?.ram.name} |{" "}
              {product?.color.name} {product?.color.value}{" "}
            </p>
          </div>

          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col gap-1">
              {product?.discount && (
                <>
                  <p className="font-semibold text-sm">
                    {" "}
                    - Rs{" "}
                    {new Intl.NumberFormat("en-IN", {
                      maximumSignificantDigits: 3,
                    }).format(product?.discount || 0)}{" "}
                    Off{" "}
                  </p>
                  <p className="text-sm line-through text-red-700">
                    Rs{" "}
                    {new Intl.NumberFormat("en-IN", {
                      maximumSignificantDigits: 3,
                    }).format(product?.price || 0)}
                  </p>
                </>
              )}

              <h1 className="font-bold">
                Rs{" "}
                {new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(product?.newPrice || 0)}
              </h1>
            </div>
            <CopyButton id={product?.id} label="Copy" message="Product Link copied to clipboard." />
          </div>

          <Button onClick={() => router.push(`${product?.id}`)} size="lg">
            Checkout
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
