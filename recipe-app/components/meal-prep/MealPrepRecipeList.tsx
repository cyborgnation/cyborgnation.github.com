"use client"

import Link from "next/link"
import { Dumbbell, ExternalLink, Sparkles } from "lucide-react"
import type { MealPrepRecipeRef } from "@/types/meal-prep"
import type { Recipe } from "@/types/recipe"

interface MealPrepRecipeListProps {
  recipeRefs: MealPrepRecipeRef[]
  recipes: Record<string, Recipe>
}

export function MealPrepRecipeList({ recipeRefs, recipes }: MealPrepRecipeListProps) {
  if (recipeRefs.length === 0) {
    return (
      <div className="text-sm py-6 text-center" style={{ color: "var(--color-muted-foreground)" }}>
        No recipes added yet. Chat with AI to plan your meal prep week.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {recipeRefs.map((ref, i) => {
        const recipe = recipes[ref.recipeId]
        const isStub = recipe && recipe.ingredients.length === 0 && recipe.steps.length === 0
        const macros = recipe?.macros

        return (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl border"
            style={{
              borderColor: isStub ? "rgba(6,182,212,0.3)" : "var(--color-border)",
              backgroundColor: isStub ? "rgba(6,182,212,0.06)" : "var(--color-muted)",
            }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: "rgba(6,182,212,0.15)", color: "#22D3EE" }}>
              <Dumbbell size={15} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "rgba(6,182,212,0.15)", color: "#22D3EE" }}>
                  {ref.servingsPerWeek}×/week
                </span>
                {isStub && (
                  <span className="text-xs font-medium" style={{ color: "#059669" }}>
                    Not generated yet
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

              {macros && (
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                  <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
                    <strong style={{ color: "#6366F1" }}>{macros.calories}</strong> kcal
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
                    <strong style={{ color: "#059669" }}>{macros.protein}g</strong> protein
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
                    <strong style={{ color: "#D97706" }}>{macros.carbs}g</strong> carbs
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
                    <strong style={{ color: "#DC2626" }}>{macros.fat}g</strong> fat
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
                    per serving
                  </span>
                </div>
              )}
            </div>

            {recipe && (
              <Link
                href={`/recipes/${ref.recipeId}`}
                className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors mt-0.5"
                style={isStub ? {
                  backgroundColor: "#0891B2",
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
