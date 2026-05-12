"use client"

import Link from "next/link"
import { ChefHat, ExternalLink, Sparkles } from "lucide-react"
import type { RecipeRef } from "@/types/meal"
import type { Recipe } from "@/types/recipe"

interface MealRecipeListProps {
  recipeRefs: RecipeRef[]
  recipes: Record<string, Recipe>
}

const roleLabel: Record<string, string> = {
  main: "Main Course",
  side: "Side Dish",
  dessert: "Dessert",
  drink: "Drink",
}

const roleColor: Record<string, { bg: string; text: string; border: string }> = {
  main: { bg: "rgba(139,92,246,0.12)", text: "#C4B5FD", border: "rgba(139,92,246,0.25)" },
  side: { bg: "rgba(14,165,233,0.12)", text: "#38BDF8", border: "rgba(14,165,233,0.25)" },
  dessert: { bg: "rgba(192,38,211,0.12)", text: "#E879F9", border: "rgba(192,38,211,0.25)" },
  drink: { bg: "rgba(251,146,60,0.12)", text: "#FB923C", border: "rgba(251,146,60,0.25)" },
}

export function MealRecipeList({ recipeRefs, recipes }: MealRecipeListProps) {
  if (recipeRefs.length === 0) {
    return (
      <div className="text-sm py-6 text-center" style={{ color: "var(--color-muted-foreground)" }}>
        No recipes added yet. Chat with AI to plan your meal.
      </div>
    )
  }

  const ordered = ["main", "side", "dessert", "drink"]
  const sorted = [...recipeRefs].sort(
    (a, b) => ordered.indexOf(a.role) - ordered.indexOf(b.role)
  )

  return (
    <div className="space-y-2">
      {sorted.map((ref, i) => {
        const recipe = recipes[ref.recipeId]
        const colors = roleColor[ref.role] ?? roleColor.main
        const isStub = recipe && recipe.ingredients.length === 0 && recipe.steps.length === 0
        return (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border"
            style={{
              borderColor: isStub ? "rgba(251,146,60,0.3)" : "var(--color-border)",
              backgroundColor: isStub ? "rgba(251,146,60,0.06)" : "var(--color-muted)",
            }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: colors.bg, color: colors.text }}>
              <ChefHat size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full font-mono"
                  style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                  {roleLabel[ref.role]}
                </span>
                {isStub && (
                  <span className="text-xs font-medium" style={{ color: "#FB923C" }}>
                    Generating…
                  </span>
                )}
              </div>
              {recipe ? (
                <p className="text-sm font-medium mt-0.5 truncate"
                  style={{ color: "var(--color-foreground)" }}>
                  {recipe.title}
                </p>
              ) : (
                <p className="text-sm mt-0.5" style={{ color: "var(--color-muted-foreground)" }}>
                  Recipe not found
                </p>
              )}
            </div>
            {recipe && (
              <Link
                href={`/recipes/${ref.recipeId}`}
                className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={isStub ? {
                  backgroundColor: "#EA580C",
                  color: "white",
                } : {
                  color: "var(--color-muted-foreground)",
                  backgroundColor: "var(--color-border)",
                }}
                title={isStub ? "Generate recipe" : "View recipe"}
                onClick={(e) => e.stopPropagation()}
              >
                {isStub ? (
                  <><Sparkles size={12} /> Generate</>
                ) : (
                  <ExternalLink size={14} />
                )}
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}
