"use client"

import Link from "next/link"
import { Utensils, Trash2 } from "lucide-react"
import type { Meal } from "@/types/meal"
import { deleteMeal } from "@/lib/db/meals"
import { toast } from "sonner"

interface MealCardProps {
  meal: Meal
}

const roleLabel: Record<string, string> = {
  main: "main",
  side: "side",
  dessert: "dessert",
  drink: "drink",
}

export function MealCard({ meal }: MealCardProps) {
  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm(`Delete "${meal.title}"?`)) return
    try {
      await deleteMeal(meal.id)
      toast.success("Meal deleted")
    } catch {
      toast.error("Failed to delete meal")
    }
  }

  return (
    <Link href={`/meals/${meal.id}`} className="block group">
      <div
        className="rounded-2xl p-5 border card-hover relative"
        style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
      >
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50"
          style={{ color: "var(--color-destructive)" }}
          title="Delete meal"
        >
          <Trash2 size={14} />
        </button>

        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}>
            <Utensils size={18} />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm leading-snug truncate pr-6"
              style={{ fontFamily: '"Lora", Georgia, serif', color: "var(--color-foreground)" }}>
              {meal.title}
            </h3>
            {meal.description && (
              <p className="text-xs mt-0.5 line-clamp-2"
                style={{ color: "var(--color-muted-foreground)" }}>
                {meal.description}
              </p>
            )}
          </div>
        </div>

        {meal.recipeRefs.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {meal.recipeRefs.map((ref, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}>
                {roleLabel[ref.role] ?? ref.role}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
