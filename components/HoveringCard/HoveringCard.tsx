"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, Settings } from "lucide-react"
import { useSession } from "next-auth/react"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Button } from "../ui/button"

const HoveringCard = () => {
  const router = useRouter()
  const { data: user, status } = useSession()
  const url = user?.user?.image
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div>
          {status === "unauthenticated" ? (
            <Button onClick={() => router.push("/auth")} variant="secondary">
              Account
            </Button>
          ) : (
            <>
              {url ? (
                <img
                  onClick={() => router.push("/auth")}
                  className="h-[30px] w-[30px] rounded-md hover:cursor-pointer"
                  src={url || undefined}
                  alt="image"
                />
              ) : (
                <Button
                size="lg"
                  onClick={() => router.push("/auth")}
                  className="p-2 border-2 rounded-lg hover:cursor-pointer"
                >
                  {user?.user?.name?.split(" ")[0]}
                </Button>
              )}
            </>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-100">
        {status === "unauthenticated" ? (
          <div className="flex gap-10">
            <Button onClick={() => router.push("/api/auth/signin")}>
              Login In
            </Button>

            <Button onClick={() => router.push("/auth")} variant="secondary">
              Sign Up
            </Button>
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
                <div className="flex gap-2 text-xs hover:cursor-pointer hover:underline">
                  <Settings size={15} />
                  <Link href="/auth">Manage Account</Link>
                </div>
                <div className="flex gap-2 text-xs hover:cursor-pointer hover:underline">
                  <LogOut size={15} />
                  <Link href="/api/auth/signout">Logout</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}

export default HoveringCard
