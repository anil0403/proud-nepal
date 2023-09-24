"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import useGraphic from "@/hooks/useGraphic"
import useProcessor from "@/hooks/useProcessor"
import useProducts from "@/hooks/useProducts"
import useRam from "@/hooks/useRam"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProductCard from "@/components/ProductCard/ProductCard"

const FormSchema = z.object({
  processor: z.string().optional(),
  ram: z.string().optional(),
  graphic: z.string().optional(),
  display: z.string().optional(),
  min: z.number().min(0).optional(),
  max: z.number().min(0).optional(),
})

export default function Browse() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { data: products } = useProducts()
  const { data: graphics } = useGraphic()
  const { data: processors } = useProcessor()
  const { data: rams } = useRam()

  const [max, setMax] = useState()
  const [min, setMin] = useState()

  // console.log("ram = ", rams)
  // console.log("graphic = ", graphics)
  // console.log("processor = ", processors)

  let filteredProduct = products

  // const [processor, setProcessor] = useState("")
  // const [RAM, setRAM] = useState("")
  // const [graphic, setGraphics] = useState("")
  // const [display, setDisplay] = useState("")
  // const [price, setPrice] = useState(0)
  // const [min, setMin] = useState(0)
  // const [max, setMax] = useState(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false)
  const [newProduct, setNewProduct] = useState<any>(filteredProduct)

  const applyFilters = (data: z.infer<typeof FormSchema>) => {
    const minPrice =
      typeof data.min === "string" ? parseFloat(data.min) : data.min
    const maxPrice =
      typeof data.max === "string" ? parseFloat(data.max) : data.max

    const filterProcessor = () => {
      console.log(`processor = ${data.processor}`)
      filteredProduct = filteredProduct?.filter((product: any) => {
        if (!data.processor) return product

        return data.processor === product?.sizeId ? product : null
      })
    }
    const filterRam = () => {
      filteredProduct = filteredProduct?.filter((product: any) => {
        if (!data.ram) return product
        return data.ram === product?.ramId ? product : null
      })
    }
    const filterGraphic = () => {
      filteredProduct = filteredProduct?.filter((product: any) => {
        if (!data.graphic) return product
        return data.graphic === product?.colorId ? product : null
      })
    }
    const filterDisplay = () => {
      filteredProduct = filteredProduct?.filter((product: any) => {
        if (!data.display) return product
        return data.display === product?.display ? product : null
      })
    }

    const filterPrice = () => {
      filteredProduct = filteredProduct?.filter((product: any) => {
        return (
          (!min || product?.price >= min) && (!max || product?.price <= max)
        )
      })
    }

    filterProcessor()
    // console.log(`new product = ${newProduct}`);

    filterRam()
    // console.log(`new product = ${newProduct}`);

    filterDisplay()
    // console.log(`new product = ${newProduct}`);

    filterGraphic()
    // console.log(`new product = ${newProduct}`);

    filterPrice()

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
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(applyFilters)}
          className="w-full my-10 border-b"
        >
          <h1 className="text-xl font-bold mb-5 ">Filter Products</h1>
          {/* <div className="flex flex-row flex-wrap items-center md:gap-10 "> */}
          <div className="grid items-center justify-between  grid-cols-1 md:grid-cols-3   lg:grid-cols-4 xl:grid-cols-6 gap-5 border-t py-5">
            <div className=" w-full md:w-[200px]">
              <FormField
                control={form.control}
                name="processor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Processor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Processor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {processors?.map((processor: any) => (
                          <SelectItem key={processor?.id} value={processor?.id}>
                            {processor?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full md:w-[200px]">
              <FormField
                control={form.control}
                name="ram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ram</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Ram" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {rams?.map((ram: any) => (
                          <SelectItem key={ram?.id} value={ram?.id}>
                            {ram?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full md:w-[200px]">
              <FormField
                control={form.control}
                name="graphic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graphics</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Graphics" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {graphics?.map((graphic: any) => (
                          <SelectItem key={graphic?.id} value={graphic?.id}>
                            {graphic?.name} {graphic?.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full md:w-[200px]">
              <FormField
                control={form.control}
                name="display"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {products?.map((product: any) => (
                          <SelectItem
                            key={product?.id}
                            value={product?.display}
                          >
                            {product?.display}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full md:w-[200px]">
              <FormField
                control={form.control}
                name="min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Price</FormLabel>
                    <FormControl>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        onChange={(e: any) => setMin(e.target.value)}
                        placeholder="min price"
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full md:w-[200px]">
              <FormField
                control={form.control}
                name="max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Price</FormLabel>
                    <FormControl>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        onChange={(e: any) => setMax(e.target.value)}
                        placeholder="max price"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="my-5">
            Apply Filters
          </Button>
        </form>
      </Form>

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
