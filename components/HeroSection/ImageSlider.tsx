"use client"

import { useEffect, useRef, useState } from "react"

import useBillboards from "@/hooks/useBillboard"
import { Skeleton } from "@/components/ui/skeleton"

const ImageSlider = () => {
  const { data: billboards, isLoading } = useBillboards()
  const images =
    billboards === undefined
      ? []
      : billboards.map((billboard: any) => billboard.imageUrl)

  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images?.length)
    }, 2000)
    return () => {
      clearInterval(autoSlide)
    }
  }, [images])

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full overflow-hidden  mx-auto">
      {isLoading ? (
        <Skeleton className="min-w-full h-[400px]" />
      ) : (
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          ref={containerRef}
        >
          {images?.map((image: any, index: number) => (
            <img
              key={index}
              src={image}
              className="min-w-full h-[400px]"
              alt="Slide"
            />
          ))}
        </div>
      )}

      <div className="absolute top-1/2 left-4  -translate-y-1/2">
        <button onClick={prevSlide} className="bg-white p-2 rounded-full">
          &#10094;
        </button>
      </div>
      <div className="absolute top-1/2 right-4  -translate-y-1/2">
        <button onClick={nextSlide} className="bg-white p-2 rounded-full">
          &#10095;
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2  -translate-x-1/2 space-x-2 flex">
        {images?.map((_: any, idx: number) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`block w-3 h-3 rounded-full ${
              activeIndex === idx ? "bg-white" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
