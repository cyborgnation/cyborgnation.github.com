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

const roleColor: Record<string, { bg: string; text: string }> = {
  main: { bg: "var(--color-accent)", text: "var(--color-primary)" },
  side: { bg: "#F0FDFA", text: "#0F766E" },
  dessert: { bg: "#FDF4FF", text: "#A21CAF" },
  drink: { bg: "#FEF3C7", text: "#92400E" },
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
              borderColor: isStub ? "#FED7AA" : "var(--color-border)",
              backgroundColor: isStub ? "#FFF7ED" : "var(--color-card)",
            }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: colors.bg, color: colors.text }}>
              <ChefHat size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: colors.bg, color: colors.text }}>
                  {roleLabel[ref.role]}
                </span>
                {isStub && (
                  <span className="text-xs font-medium" style={{ color: "#C2410C" }}>
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
