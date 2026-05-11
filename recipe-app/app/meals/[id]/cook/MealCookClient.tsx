"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useMeal } from "@/lib/hooks/useMeals"
import { useRecipes } from "@/lib/hooks/useRecipes"
import { CookingLayout } from "@/components/cooking/CookingLayout"
import { CookingRecipeView } from "@/components/cooking/CookingRecipeView"
import type { Recipe } from "@/types/recipe"

interface MealCookClientProps {
  id: string
}

export function MealCookClient({ id }: MealCookClientProps) {
  const meal = useMeal(id)
  const allRecipes = useRecipes()
  const [activeRecipeIndex, setActiveRecipeIndex] = useState(0)

  const mealRecipes = useMemo<Recipe[]>(() => {
    if (!meal || !allRecipes) return []
    const map: Record<string, Recipe> = {}
    for (const r of allRecipes) map[r.id] = r
    return meal.recipeRefs
      .map((ref) => map[ref.recipeId])
      .filter((r): r is Recipe => r !== undefined)
  }, [meal, allRecipes])

  if (meal === undefined || allRecipes === undefined) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--color-border)", borderTopColor: "#EA580C" }} />
      </div>
    )
  }

  if (!meal) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4"
        style={{ backgroundColor: "var(--color-background)" }}>
        <p style={{ color: "var(--color-muted-foreground)" }}>Meal not found.</p>
        <Link href="/meals" className="text-sm font-medium" style={{ color: "#EA580C" }}>
          Back to meals
        </Link>
      </div>
    )
  }

  const activeRecipe = mealRecipes[activeRecipeIndex]

  return (
    <CookingLayout title={meal.title}>
      <div className="flex h-full">
        {/* Recipe tab list */}
        {mealRecipes.length > 1 && (
          <div className="w-48 shrink-0 border-r overflow-y-auto p-3"
            style={{ borderColor: "var(--color-border)" }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2 px-2"
              style={{ color: "var(--color-muted-foreground)" }}>
              Dishes
            </p>
            {mealRecipes.map((recipe, i) => (
              <button
                key={recipe.id}
                onClick={() => setActiveRecipeIndex(i)}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium mb-1 transition-colors"
                style={i === activeRecipeIndex ? {
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-primary)",
                } : {
                  color: "var(--color-muted-foreground)",
                }}
              >
                {recipe.title}
              </button>
            ))}
          </div>
        )}

        {/* Recipe view */}
        <div className="flex-1 overflow-hidden">
          {activeRecipe ? (
            <CookingRecipeView recipe={activeRecipe} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p style={{ color: "var(--color-muted-foreground)" }}>
                No recipes found in this meal.
              </p>
            </div>
          )}
        </div>
      </div>
    </CookingLayout>
  )
}
