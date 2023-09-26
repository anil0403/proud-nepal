import { ShoppingCart } from "lucide-react"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import HoveringCard from "./HoveringCard/HoveringCard"
import MenuToggle from "./MobileMenu/MenuToggle"
import MobileSidebar from "./MobileMenu/MobileSidebar"

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b py-2">
      <div className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <div className="flex flex-row gap-5 justify-end items-center ">
              <ShoppingCart className="hover:cursor-pointer" size={25} />
              <ThemeToggle />
              <MenuToggle />
              <HoveringCard />
            </div>
          </nav>
        </div>
      </div>
      <MobileSidebar items={siteConfig.mainNav} />
    </header>
  )
}
