import React from "react"

import Section from "./Section"

interface ProductCardSectionProps {
  products: any
  isLoading: boolean
}

const ProductCardSection = ({
  products,
  isLoading,
}: ProductCardSectionProps) => {
  const featuredProducts = products?.filter((product: any) =>
    product?.isArchived ? null : product?.isFeatured ? product : null
  )

  const officeProducts = products?.filter((product: any) =>
    product?.isArchived ? null : product?.isOffice ? product : null
  )

  const studentProducts = products?.filter((product: any) =>
    product?.isArchived ? null : product?.isStudent ? product : null
  )

  const gamingProducts = products?.filter((product: any) =>
    product?.isArchived ? null : product?.isGaming ? product : null
  )

  return (
    <div className="flex flex-col gap-10 ">
      <Section
        products={featuredProducts}
        label="# Explore The Latest Arrivals"
        isLoading ={isLoading}
      />

      <Section
        products={studentProducts}
        label="Featured Products # Students"
        isLoading ={isLoading}
      />

      <Section products={officeProducts} isLoading={isLoading} label="Featured Products # Office" />

      <Section products={gamingProducts} isLoading={isLoading} label="Featured Products # Gaming" />
    </div>
  )
}

export default ProductCardSection
