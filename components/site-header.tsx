"use client"

import Image from "next/image"
import Link from "next/link"
import { LogOut, Settings, ShoppingCart, User } from "lucide-react"
import { useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import MenuToggle from "./MobileMenu/MenuToggle"
// import MobileSidebar from "./MobileSidebar"
import MobileSidebar from "./MobileMenu/MobileSidebar"
import { Button } from "./ui/button"

export function SiteHeader() {
  const { data: user, status } = useSession()
  console.log(user)
  const url = user?.user?.image

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b py-2">
      <div className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* <Link
              href={siteConfig.links.facebook}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.facebook className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.youtube}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.youtube className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link> */}
            <div className="flex flex-row gap-5 justify-end items-center ">
              <ShoppingCart className="hover:cursor-pointer" size={25} />
              <ThemeToggle />
              <MenuToggle />

              <HoverCard>
                <HoverCardTrigger>
                  <div>
                    {status === "unauthenticated" ? (
                      <Link href="/auth">
                        <Button variant="secondary">Account</Button>
                      </Link>
                    ) : (
                      <>
                        {url ? (
                          <Link href="/auth">
                            <img
                              className="h-[30px] w-[30px] rounded-md"
                              src={url || undefined}
                              alt="image"
                            />
                          </Link>
                        ) : (
                          <p className="p-2 border-2 rounded-lg">User</p>
                        )}
                      </>
                    )}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-100">
                  {status === "unauthenticated" ? (
                    <div className="flex gap-10">
                      <Link href="/api/auth/signin">
                        <Button>Login In</Button>
                      </Link>
                      <Link href="/register">
                        <Button variant="secondary">Sign Up</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex gap-3 items-start">
                      <img
                        className="h-10 w-10 rounded-full my-2"
                        src={url || undefined}
                        alt="profile icon"
                      />
                      <div>
                        <h2>{user?.user?.name}</h2>
                        <p className="text-sm">{user?.user?.email}</p>

                        <div className="mt-4 flex flex-col gap-2">
                          <p className="flex gap-2 text-xs hover:cursor-pointer hover:underline">
                            <Settings size={15} />
                            <Link href="/auth">Manage Account</Link>
                          </p>
                          <p className="flex gap-2 text-xs hover:cursor-pointer hover:underline">
                            <LogOut size={15} />
                            <Link href="/api/auth/signout">Logout</Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </HoverCardContent>
              </HoverCard>
            </div>
          </nav>
        </div>
      </div>
      <MobileSidebar items={siteConfig.mainNav} />
    </header>
  )
}
