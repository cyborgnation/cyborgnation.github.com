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
      style={{
        borderColor: "rgba(139, 92, 246, 0.15)",
        backgroundColor: "rgba(7, 7, 16, 0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center gradient-bg shrink-0">
          <Bot size={15} className="text-white" />
        </div>
        <span className="hidden sm:inline font-mono font-black text-sm tracking-widest gradient-text select-none">
          MEALBOT3000
        </span>
      </Link>

      <nav className="flex items-center gap-1 flex-1">
        {navLinks.map((link) => {
          const active = link.match.test(pathname)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                active ? "" : "hover:bg-white/5"
              )}
              style={
                active
                  ? {
                      background: "rgba(139, 92, 246, 0.14)",
                      color: "#C4B5FD",
                      border: "1px solid rgba(139, 92, 246, 0.35)",
                    }
                  : {
                      color: "var(--color-muted-foreground)",
                      border: "1px solid transparent",
                    }
              }
            >
              <link.icon size={15} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <Link
        href="/recipes/new"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold text-white gradient-bg btn-glow shrink-0"
      >
        <Plus size={14} />
        <span className="hidden sm:inline">New Recipe</span>
      </Link>
    </header>
  )
}
