"use client"

import React from "react"
import Link from "next/link"
import { X } from "lucide-react"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
// import useSidebarStore from "@/hooks/useSidebar"
import useSidebarStore from "@/hooks/useSidebar"
import { Separator } from "@/components/ui/separator"

interface MainNavProps {
  items?: NavItem[]
}

const MobileSidebar = ({ items }: MainNavProps) => {
  // const [toggle, setToggle] = useState(false);
  const { isSidebarOpen, closeSidebar } = useSidebarStore()
  return (
    <>
      {isSidebarOpen && (
        <div className=" top-0 absolute  z-50 h-screen bg-black w-full pl-5">
          <div className="my-5 flex justify-between">
            <h2 className="text-white">Menu</h2>
            <X
              size={30}
              className="text-white mr-10 hover:cursor-pointer"
              onClick={closeSidebar}
            />
          </div>
          <Separator />
          <nav className=" flex flex-col gap-5  my-5">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    onClick={() => closeSidebar()}
                    key={index}
                    href={item.href}
                    className={cn("flex items-center  font-medium text-white")}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        </div>
      )}
    </>
  )
}

export default MobileSidebar
