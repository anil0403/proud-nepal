// components/ImageSlider.tsx
import { useEffect, useRef, useState } from "react"

type Props = {
  images: string[]
}

const ImageSlider: React.FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    console.log("Setting up interval");
    const autoSlide = setInterval(() => {
      console.log("Changing slide");
      setActiveIndex((prev) => (prev + 1) % images?.length);
    }, 1000);
    return () => {
      console.log("Clearing interval");
      clearInterval(autoSlide);
    };
  }, [images]);
  

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
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        ref={containerRef}
      >
        {images?.map((image, index) => (
          <img key={index} src={image} className="min-w-full" alt="Slide" />
        ))}
      </div>
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
        {images?.map((_, idx) => (
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
