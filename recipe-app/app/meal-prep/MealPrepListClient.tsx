"use client"

import Link from "next/link"
import { Plus, Dumbbell } from "lucide-react"
import { useMealPreps } from "@/lib/hooks/useMealPreps"
import { MealPrepCard } from "@/components/meal-prep/MealPrepCard"
import { EmptyState } from "@/components/layout/EmptyState"

export function MealPrepListClient() {
  const mealPreps = useMealPreps()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold" style={{ color: "var(--color-foreground)" }}>
          Meal Prep
        </h1>
        <Link
          href="/meal-prep/new"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono uppercase tracking-wide transition-colors"
          style={{ color: "#22D3EE", backgroundColor: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)" }}
        >
          <Plus size={14} />
          New Prep
        </Link>
      </div>

      {mealPreps === undefined ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-2xl animate-pulse"
              style={{ backgroundColor: "var(--color-muted)" }} />
          ))}
        </div>
      ) : mealPreps.length === 0 ? (
        <EmptyState
          icon={Dumbbell}
          title="No meal preps yet"
          description="Plan a full week of prep-ahead meals. AI tracks macros and helps you hit your fitness goals."
          action={{ label: "Plan first week", href: "/meal-prep/new" }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mealPreps.map((mp) => (
            <MealPrepCard key={mp.id} mealPrep={mp} />
          ))}
        </div>
      )}
    </div>
  )
}
