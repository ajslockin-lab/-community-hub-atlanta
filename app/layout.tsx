import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { V0Provider } from "@/lib/context"
import dynamic from "next/dynamic"

const V0Setup = dynamic(() => import("@/components/v0-setup"))

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})

const isV0 = process.env["VERCEL_URL"]?.includes("vusercontent.net") ?? false

export const metadata: Metadata = {
  title: {
    template: "%s | Atlanta Community Hub",
    default: "Atlanta Community Hub - Your Local Resource Directory",
  },
  description:
    "Atlanta Community Hub is your central platform for finding and accessing local resources, community services, events, and neighborhood connections across metro Atlanta. Connect with food assistance, housing, health services, employment, and more.",
  keywords: [
    "Atlanta",
    "community resources",
    "local services",
    "food assistance",
    "housing",
    "health services",
    "employment",
    "youth programs",
    "senior services",
    "community hub",
    "metro Atlanta",
  ],
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background scroll-smooth">
      <body className={cn(dmSans.variable, jetBrainsMono.variable, playfairDisplay.variable, "antialiased font-sans")}>
        <V0Provider isV0={isV0}>
          {children}
          {isV0 && <V0Setup />}
        </V0Provider>
      </body>
    </html>
  )
}
