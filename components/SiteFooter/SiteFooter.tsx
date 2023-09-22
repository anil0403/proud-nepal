import React from "react"
import Link from "next/link"
import { Facebook, Instagram, Music2, Youtube } from "lucide-react"

const SiteFooter = () => {
  return (
    <footer className="bg-background  bottom-0 z-10 w-full my-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-y">
        <div className="my-2 ">
          <h2 className="font-bold py-2 border-b">About Us</h2>
          <div className="py-2 my-2 flex  flex-col gap-1">
            <Link href="/">
              <p>Proud Nepal It Suppliers</p>
            </Link>
            <p>Putalisadak, Dhobidhara Marg, Kathmandu, Nepal</p>
            <p>+977 986-7174242</p>
            <p>proudnepalits@gmail.com</p>
          </div>
        </div>

        <div className="my-2 ">
          <h2 className="font-bold py-2 border-b">Quick Links</h2>
          <div className="py-2 my-2 flex  flex-col gap-1">
            <Link href="/browse">
              <p>Browse</p>
            </Link>
            <Link href="/about">
              <p>About Us</p>
            </Link>
            <Link href="/contact">
              <p>Contact Us</p>
            </Link>
            <Link href="/cart">
              <p>Cart</p>
            </Link>
          </div>
        </div>

        <div className="my-2 ">
          <h2 className="font-bold py-2 border-b">Connect</h2>
          <div className="py-2 my-2 flex  items-center gap-10 ">
            <Link
              target="_blank"
              href="https://www.facebook.com/proudnepalitsuppliers"
            >
              <Facebook
                className="hover:bg-slate-200 p-2 rounded-md hover:cursor-pointer"
                size={40}
              />
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/proudnepalit/"
            >
              <Instagram
                className="hover:bg-slate-200 p-2 rounded-md hover:cursor-pointer"
                size={40}
              />
            </Link>
            <Link
              target="_blank"
              href="https://www.youtube.com/@proudnepalitsupplierspvtltd"
            >
              <Youtube
                className="hover:bg-slate-200 p-2 rounded-md hover:cursor-pointer"
                size={40}
              />
            </Link>
            <Link target="_blank" href="https://www.tiktok.com/@shyamlalregmi5">
              <Music2
                className="hover:bg-slate-200 p-2 rounded-md hover:cursor-pointer"
                size={40}
              />
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center my-4">
        © 2023 Proud Nepal IT Suppliers, All Rights Reserved.
      </p>
    </footer>
  )
}

export default SiteFooter
