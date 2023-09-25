"use client"

import React, { useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import ProductCard from "../ProductCard/ProductCard"

interface SectionProps {
  products: any
  label: String
}

const Section = ({ products, label }: SectionProps) => {
  const [toggle, setToggle] = useState(false)
  return (
    <div className=" py-5">
      <h1 className="text-center mb-10 font-semibold">{label}</h1>
      <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
          {products?.map((product: any, count: number) =>
            count < 4 ? (
              <ProductCard key={product?.id} product={product} />
            ) : null
          )}
        </div>

        <div className="my-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                onClick={() => setToggle(!toggle)}
                className="font-semibold"
              >
                {!toggle ? "Show More" : "Show Less"}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5">
                  {products?.map((product: any, count: number) =>
                    count >= 4 ? (
                      <ProductCard key={product?.id} product={product} />
                    ) : null
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default Section
