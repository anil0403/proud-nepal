"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNavAdmin({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      href: `/admin`,
      label: "Overview",
      active: pathname === "/admin",
    },
    {
      href: `/admin/billboards`,
      label: "Billboards",
      active: pathname === "/admin/billboards",
    },
    {
      href: "/admin/brands",
      label: "Brands",
      active: pathname === "/admin/brands",
    },
    {
      href: "/admin/processors",
      label: "Processors",
      active: pathname === "/admin/processors",
    },
    {
      href: "/admin/core",
      label: "Core",
      active: pathname === "/admin/core",
    },
    {
      href: "/admin/graphics",
      label: "Graphics",
      active: pathname === "/admin/graphics",
    },
    {
      href: "/admin/ram",
      label: "RAM",
      active: pathname === "/admin/ram",
    },
    {
      href: "/admin/products",
      label: "Products",
      active: pathname === "/admin/products",
    },
    {
      href: "/admin/orders",
      label: "Orders",
      active: pathname === "/admin/orders",
    },
    {
      href: "/admin/settings",
      label: "Settings",
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
