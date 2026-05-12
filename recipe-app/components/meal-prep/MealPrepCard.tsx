"use client"

import Link from "next/link"
import { Dumbbell } from "lucide-react"
import type { MealPrep } from "@/types/meal-prep"

interface MealPrepCardProps {
  mealPrep: MealPrep
}

export function MealPrepCard({ mealPrep }: MealPrepCardProps) {
  const recipeCount = mealPrep.recipeRefs.length
  const totalServings = mealPrep.recipeRefs.reduce((s, r) => s + r.servingsPerWeek, 0)

  return (
    <Link
      href={`/meal-prep/${mealPrep.id}`}
      className="block rounded-2xl border p-4 transition-colors hover:bg-muted/50"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg shrink-0"
          style={{ backgroundColor: "#ECFDF5", color: "#059669" }}>
          <Dumbbell size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: "var(--color-foreground)" }}>
            {mealPrep.title}
          </p>
          {mealPrep.description && (
            <p className="text-xs mt-0.5 line-clamp-2" style={{ color: "var(--color-muted-foreground)" }}>
              {mealPrep.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
              {recipeCount} dish{recipeCount !== 1 ? "es" : ""}
            </span>
            <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
              {totalServings} servings/week
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
