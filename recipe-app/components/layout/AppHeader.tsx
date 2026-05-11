"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChefHat, BookOpen, Utensils, Plus } from "lucide-react"
import { cn } from "@/lib/utils/cn"

export function AppHeader() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Recipes", icon: BookOpen, match: /^\/$|^\/recipes/ },
    { href: "/meals", label: "Meals", icon: Utensils, match: /^\/meals/ },
  ]

  return (
    <header className="sticky top-0 z-40 h-14 border-b flex items-center px-4 gap-6"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
      <Link href="/" className="flex items-center gap-2 font-semibold text-sm shrink-0"
        style={{ color: "var(--color-primary)" }}>
        <ChefHat size={20} />
        <span>Mise en Place</span>
      </Link>

      <nav className="flex items-center gap-1 flex-1">
        {navLinks.map((link) => {
          const active = link.match.test(pathname)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                active
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              style={active ? {
                color: "var(--color-primary)",
                backgroundColor: "var(--color-accent)",
              } : {
                color: "var(--color-muted-foreground)",
              }}
            >
              <link.icon size={15} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center gap-2">
        <Link
          href="/recipes/new"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-white transition-colors"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <Plus size={14} />
          New Recipe
        </Link>
      </div>
    </header>
  )
}
