import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10 relative ">
      <Link href="/" className="flex items-center space-x-2">
        <h2 className="inline-block font-bold">{siteConfig.name}</h2>
      </Link>
      {items?.length ? (
        <>
          <nav className="hidden md:flex gap-6">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center  font-medium text-muted-foreground hover:underline ease-in-out",
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
          {/* mobile menu */}
        </>
      ) : null}
    </div>
  )
}
