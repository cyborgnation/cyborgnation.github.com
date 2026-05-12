"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bot, BookOpen, Utensils, Dumbbell, Plus } from "lucide-react"
import { cn } from "@/lib/utils/cn"

export function AppHeader() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Recipes", icon: BookOpen, match: /^\/$|^\/recipes/ },
    { href: "/meals", label: "Meals", icon: Utensils, match: /^\/meals/ },
    { href: "/meal-prep", label: "Prep", icon: Dumbbell, match: /^\/meal-prep/ },
  ]

  return (
    <header
      className="sticky top-0 z-40 h-14 border-b flex items-center px-4 gap-4"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}
    >
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--color-accent)", color: "var(--color-primary)" }}>
          <Bot size={15} />
        </div>
        <span className="hidden sm:inline text-base font-bold leading-none serif"
          style={{ fontFamily: '"Lora", Georgia, serif', color: "var(--color-foreground)" }}>
          Mealbot<span className="gradient-text">3000</span>
        </span>
      </Link>

      <nav className="flex items-center gap-0.5 flex-1">
        {navLinks.map((link) => {
          const active = link.match.test(pathname)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors",
                active ? "font-semibold" : "font-medium"
              )}
              style={active
                ? { color: "var(--color-primary)", backgroundColor: "var(--color-accent)" }
                : { color: "var(--color-muted-foreground)" }}
            >
              <link.icon size={15} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <Link
        href="/recipes/new"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold text-white gradient-bg shrink-0 transition-opacity hover:opacity-90"
      >
        <Plus size={14} />
        <span className="hidden sm:inline">New Recipe</span>
      </Link>
    </header>
  )
}
