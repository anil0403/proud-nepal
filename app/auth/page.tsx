"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import RegisterForm from "./registerForm"

const Auth = () => {
  const { data: user, status } = useSession()
  // console.log(user)
  const router = useRouter()

  return (
    <div className="flex justify-center items-center">
      {status === "unauthenticated" ? (
        <RegisterForm />
      ) : (
        <Card className="w-1/2 my-20">
          <CardHeader>
            <CardTitle> {user?.user?.name} </CardTitle>
            <CardDescription> {user?.user?.email} </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/api/auth/signout")}>
              Logout
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default Auth
