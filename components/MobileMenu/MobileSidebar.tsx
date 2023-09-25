"use client"

import React from "react"
import Link from "next/link"
import { LogOut, Settings, X } from "lucide-react"

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
                    rel="noreferrer"
                    className={cn("flex items-center  font-medium text-white")}
                  >
                    {item.title}
                  </Link>
                )
            )}
            <Link
              onClick={() => closeSidebar()}
              href="/cart"
              rel="noreferrer"
              className={cn("flex items-center  font-medium text-white")}
            >
              Cart
            </Link>

            <Link
              onClick={() => closeSidebar()}
              href="/products"
              rel="noreferrer"
              className={cn("flex items-center  font-medium text-white")}
            >
              Products
            </Link>

            <Link
              onClick={() => closeSidebar()}
              href="/register"
              rel="noreferrer"
              className={cn("flex items-center  font-medium text-white")}
            >
              Sign Up
            </Link>

            <Link
              onClick={() => closeSidebar()}
              href="/api/auth/signin"
              rel="noreferrer"
              className={cn("flex items-center  font-medium text-white")}
            >
              Sign In
            </Link>

            <Link
              onClick={() => closeSidebar()}
              href="/auth"
              rel="noreferrer"
              className={cn("flex items-center  font-medium text-white")}
            >
              Manage Account
            </Link>

            <Link
              onClick={() => closeSidebar()}
              href="/auth"
              rel="noreferrer"
              className={cn("flex items-center  font-medium text-white")}
            >
              <p className="flex gap-2 my-5 border-t-2 w-full p-4">
                <LogOut />
                Logout
              </p>
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}

export default MobileSidebar
