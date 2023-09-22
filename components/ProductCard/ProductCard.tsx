import React from "react"
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

interface ProductCardProps {
  product: any
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter()
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 onClick={() => router.push(`${product?.id}`)} >{product.name}</h2>{" "}
        </CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Image
          src={product?.images[0].url}
          width={200}
          height={150}
          alt="thumbnail"
          className="hover:scale-110 transition-all  ease-in-out hover:cursor-pointer"
        />
      </CardContent>
      <CardFooter>
        <div className=" w-full flex flex-col gap-5 border-t-2 pt-4">
          <p className="bg-yellow-400 px-4  py-1 max-w-fit rounded-lg">
            - Rs{" "}
            {new Intl.NumberFormat("en-IN", {
              maximumSignificantDigits: 3,
            }).format(product?.discount || 0)}{" "}
            Off
          </p>
          <div className="flex flex-col gap-1">
            <p className="text-sm line-through text-red-700">
              Rs{" "}
              {new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(product?.price || 0)}
            </p>
            <h1 className="font-bold">
              Rs{" "}
              {new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(product?.newPrice || 0)}
            </h1>
          </div>
          <div className="flex justify-between">
            <Button onClick={() => router.push(`${product?.id}`)} size="lg">
              Checkout
            </Button>
            <Button size="lg" variant="secondary">
              To Cart
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
