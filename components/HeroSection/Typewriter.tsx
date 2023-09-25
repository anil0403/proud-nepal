import React from "react"

import { useTypewriter } from "@/hooks/useTypewriter"

const texts = [
  "Your Trusted Laptop Store",
  "Best Laptop",
  "In Affordable Price",
]

const TypeWriter = () => {
  const interval = 100 // Customize the interval as needed
  const message = useTypewriter(texts, interval)

  return (
    <div className="col-span-2 flex flex-col  items-center justify-center pr-10">
      <h1 className="text-4xl font-extrabold my-5 text-center">
        Proud Nepal
        <p className="text-xl font-semibold text-center">IT Suppliers</p>
      </h1>
      <div className="  font-mono  text-center text-xl">
        {message}
        <span className="text-red-500 ">|</span>
      </div>
      <h2 className="font-semibold my-5 text-center">
        Your One-stop destination For Laptops
      </h2>
      <p className="text-center ">
        Putalisadak, Dhobidhara Marg, Kathmandu, Nepal
      </p>
    </div>
  )
}

export default TypeWriter
