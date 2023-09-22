import React from "react"

import ProductCard from "../ProductCard/ProductCard"

interface ProductCardSectionProps {
  products: any
}

const ProductCardSection = ({ products }: ProductCardSectionProps) => {
  return (
    <div className="flex flex-col gap-10 my-10">
      <div className="border-b py-10">
        <h1 className="text-center"> # Explore The Latest Arrivals</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
          {products?.map((product: any) =>
            product?.isArchived ? null : product?.isFeatured ? (
              <ProductCard key={product?.id} product={product} />
            ) : null
          )}
        </div>
      </div>
      <div className="border-b py-10">
        <h1 className="text-center"> Featured Products # Students</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
          {products?.map((product: any) =>
            product?.isArchived ? null : product?.isStudent ? (
              <ProductCard key={product?.id} product={product} />
            ) : null
          )}
        </div>
      </div>

      <div className="border-b py-10">
        <h1 className="text-center"> Featured Products # Office</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
          {products?.map((product: any) =>
            product?.isArchived ? null : product?.isOffice ? (
              <ProductCard key={product?.id} product={product} />
            ) : null
          )}
        </div>
      </div>

      <div className="py-10">
        <h1 className="text-center"> Featured Products # Gamming</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
          {products?.map((product: any) =>
            product?.isArchived ? null : product?.isGaming ? (
              <ProductCard key={product?.id} product={product} />
            ) : null
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCardSection
