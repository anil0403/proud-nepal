"use client"

import * as React from "react"
import { Divide } from "lucide-react"

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
import { Textarea } from "@/components/ui/textarea"

const Contact = () => {
  return (
    <div className="w-full h-full flex  justify-center items-center my-10">
      <Card className="max-w-fit">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Please Enter Your Querries / Feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter Name" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="email" placeholder="Enter Email" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Phone/Mobile Number</Label>
                <Input id="phone" placeholder="Enter phone/mobile number" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Address</Label>
                <Input id="address" placeholder="Enter address" />
              </div>

              <div className=" md:col-span-2 flex flex-col space-y-1.5">
                <Label htmlFor="name">Querry / Message / Feedback</Label>
                <Textarea id="email" placeholder="Enter you message" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Clear Form</Button>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Contact
