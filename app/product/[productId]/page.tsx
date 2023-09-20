"use client"
import React from "react"

interface ProductIdProps {
  params: { productId: string }
}
const ProductId = ({ params: { productId } }: ProductIdProps) => {
  console.log(`id = ${productId}`)
  return <div>ProductId = {productId}</div>
}

export default ProductId
