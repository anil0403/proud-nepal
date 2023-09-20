"use client"

import React from "react"
import { Menu } from "lucide-react"

import useSidebarStore from "@/hooks/useSidebar"

const MenuToggle = () => {
  const { openSidebar } = useSidebarStore()
  return <Menu onClick={openSidebar} className="hover:cursor-pointer md:hidden " />
}

export default MenuToggle
