import type { Metadata } from "next"
import "./globals.css"
import { AppHeader } from "@/components/layout/AppHeader"
import { Toaster } from "@/components/layout/Toaster"

export const metadata: Metadata = {
  title: "Mise en Place — AI Recipe & Meal Planner",
  description: "Chat with AI to create, manage, and cook recipes and meals.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        <main className="min-h-[calc(100vh-56px)]">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
