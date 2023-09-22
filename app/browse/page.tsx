"use client"

import { useState } from "react"

import useGraphic from "@/hooks/useGraphic"
import useProcessor from "@/hooks/useProcessor"
import useProducts from "@/hooks/useProducts"
import useRam from "@/hooks/useRam"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProductCard from "@/components/ProductCard/ProductCard"

const Browse: React.FC = () => {
  const { data: products } = useProducts()
  const { data: graphics } = useGraphic()
  const { data: processors } = useProcessor()
  const { data: rams } = useRam()

  console.log("ram = ", rams)
  console.log("graphic = ", graphics)
  console.log("processor = ", processors)

  let filteredProduct = products

  const [processor, setProcessor] = useState("")
  const [RAM, setRAM] = useState("")
  const [graphic, setGraphics] = useState("")
  const [display, setDisplay] = useState("")
  const [price, setPrice] = useState(0)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false)
  const [newProduct, setNewProduct] = useState<any>(filteredProduct)

  const filterProcessor = () => {
    filteredProduct = filteredProduct?.filter((product: any) => {
      if (!processor) return product

      return processor === product?.sizeId ? product : null
    })
  }
  const filterRam = () => {
    filteredProduct = filteredProduct?.filter((product: any) => {
      if (!RAM) return product
      return RAM === product?.ramId ? product : null
    })
  }
  const filterGraphic = () => {
    filteredProduct = filteredProduct?.filter((product: any) => {
      if (!graphic) return product
      return graphic === product?.colorId ? product : null
    })
  }
  const filterDisplay = () => {
    filteredProduct = filteredProduct?.filter((product: any) => {
      if (!display) return product
      return display === product?.display ? product : null
    })
  }

  const filterMin = () => {
    filteredProduct = filteredProduct?.filter((product: any) => {
      if (!min) return product
      return product?.price >= min ? product : null
    })
  }

  const filterMaximum = () => {
    console.log(`max = ${max}`)
    filteredProduct = filteredProduct?.filter((product: any) => {
      if (!max) return product
      return product?.price <= max ? product : null
    })
  }

  const applyFilters = () => {
    filterProcessor()
    // console.log(`new product = ${newProduct}`);

    filterRam()
    // console.log(`new product = ${newProduct}`);

    filterDisplay()
    // console.log(`new product = ${newProduct}`);

    filterGraphic()
    // console.log(`new product = ${newProduct}`);

    filterMin()
    // console.log(`new product = ${newProduct}`);

    filterMaximum()
    // console.log(`new product = ${newProduct}`);

    setNewProduct(filteredProduct)

    setIsLoading(true)
    setFiltersApplied(true)

    // Here, you might fetch products based on the filters
    // For the purpose of this example, I'll simulate a loading delay.
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="w-full my-10">
      <div className="container bg-gray-900 p-4 rounded-lg flex flex-col justify-center items-center ">
        <label className="block text-xl text-white font-bold mb-2 text-left w-full">
          Filter By:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 w-full items-center">
          {/* Processor Dropdown */}
          <Select onValueChange={(e: any) => setProcessor(e.target.value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Processor" />
            </SelectTrigger>
            <SelectContent>
              {processors?.map((processor: any) => (
                <SelectItem key={processor?.id} value={processor?.id}>
                  {processor?.name}
                </SelectItem>
              ))}
              <SelectItem value="">None</SelectItem>
            </SelectContent>
          </Select>

          <select
            name="processor"
            onChange={(e: any) => setProcessor(e.target.value)}
            className="form-select transition-colors block w-full py-2 rounded-lg px-2 hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="" selected hidden disabled>
              Select Processor
            </option>
            {processors?.map((processor: any) => (
              <option key={processor?.id} value={processor?.id}>
                {processor?.name}
              </option>
            ))}

            <option value="">None</option>
          </select>

          {/* RAM Dropdown */}
          <select
            name="ram"
            onChange={(e: any) => setRAM(e.target.value)}
            className="form-select block w-full py-2 rounded-lg px-2 transition-colors hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="" selected hidden disabled>
              Select RAM
            </option>
            {rams?.map((ram: any) => (
              <option key={ram?.id} value={ram?.id}>
                {ram?.name} {ram?.value}
              </option>
            ))}
            <option value="">None</option>
          </select>

          {/* Graphics Dropdown */}
          <select
            name="graphics"
            onChange={(e: any) => setGraphics(e.target.value)}
            className="form-select block w-full py-2 rounded-lg px-2 transition-colors hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="" selected hidden disabled>
              Select Graphics
            </option>
            {graphics?.map((graphic: any) => (
              <option key={graphic?.id} value={graphic?.id}>
                {graphic?.name} {graphic?.value}
              </option>
            ))}
            <option value="">None</option>
          </select>

          {/* Display Dropdown */}
          <select
            name="display"
            onChange={(e: any) => setDisplay(e.target.value)}
            className="form-select block w-full py-2 rounded-lg px-2 transition-colors hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="" selected hidden disabled>
              Select Display
            </option>
            {products?.map((product: any) => (
              <option value={product?.display} key={product?.id}>
                {product?.display}
              </option>
            ))}
            <option value="">None</option>
          </select>

          {/* Price Range */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 w-full items-center col-span-full  border-2 bordder-white py-4 px-4 rounded-lg">
            <label htmlFor="price" className="text-white text-lg">
              Price Range:
            </label>

            <input
              onChange={(e: any) => setMin(e.target.value)}
              type="number"
              placeholder="Minimum price"
              className="px-2 rounded-lg py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              onChange={(e: any) => setMax(e.target.value)}
              type="number"
              placeholder="Maximum price"
              className="px-2 rounded-lg py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Apply Filters Button */}
          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="w-16 h-16 my-10 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10  gap-4 w-full mt-10">
          {newProduct?.map((product: any) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Browse
