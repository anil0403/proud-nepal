import "@/styles/globals.css"
import { Metadata } from "next"
import { ToastProvider } from "@/providers/toast-provider"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import SiteFooter from "@/components/SiteFooter/SiteFooter"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  keywords: [
    "Laptop",
    "laptop in Nepal",
    "Laptop in Nepal at Best Price",
    "Proud Nepal",
    "Proud Nepal It Suppliers",
    "Proud Nepal It Suppliers Pvt. Ltd.",
    "Laptop Shop in Putalisadak",
    "Laptop Shop in Kathmandu",
    "Laptop Shop at Nepal",
  ],
  authors: [
    {
      name: "Anil Shrestha",
      url: "https://dev.shresthaanil.com.np",
    },
  ],
  openGraph: {
    type: "website",
    title: "Proud Nepal IT Suppliers - Your Trusted Laptop Store",
    siteName: siteConfig.name,
    description:
      "Proud Nepal IT Suppliers offers a wide range of laptops from various brands, catering to all your computing needs. Find the perfect laptop with us today!",
    url: "https://pnits.com.np",
    images:
      "https://res.cloudinary.com/dnpavfe7j/image/upload/v1692265988/frg9dzs3pqtpbckrzvaw.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proud Nepal IT Suppliers - Your Trusted Laptop Store",
    description: siteConfig.description,
    images:
      "https://res.cloudinary.com/dnpavfe7j/image/upload/v1692265988/frg9dzs3pqtpbckrzvaw.jpg",

    creator: "anilshrestha0403.as@gmail.com",
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ToastProvider />
            <div className="container relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
