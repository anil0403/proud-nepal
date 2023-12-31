"use client"

import React from "react"
import { Copy, Share } from "lucide-react"
import { toast } from "react-hot-toast"

import { Button } from "../ui/button"

const CopyButton = ({
  id = "",
  label,
  message,
}: {
  id?: string
  label?: string
  message: string
}) => {
  const currentURL = window.location.href
  const onCopy = (id: string) => {
    const url = `https://www.pnits.com.np/products/${id}`
    console.log(url)
    navigator.clipboard.writeText(url)
    toast.success(message)
  }

  return (
    <Button onClick={() => onCopy(id)} variant="outline">
      {" "}
      <Copy className="mr-2 h-4 w-4" /> {label}
    </Button>
  )
}

export default CopyButton
