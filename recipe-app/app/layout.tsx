import type { Metadata } from "next"
import "./globals.css"
import { AppHeader } from "@/components/layout/AppHeader"
import { Toaster } from "@/components/layout/Toaster"

export const metadata: Metadata = {
  title: "Mealbot3000 — AI Recipe & Meal Planner",
  description: "AI-powered recipes, meals, and meal prep. Chat your way to better eating.",
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
