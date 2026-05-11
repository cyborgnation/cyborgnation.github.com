"use client"

import Link from "next/link"
import { Plus, BookOpen, Utensils } from "lucide-react"
import { useRecipes } from "@/lib/hooks/useRecipes"
import { useMeals } from "@/lib/hooks/useMeals"
import { RecipeCard } from "@/components/recipe/RecipeCard"
import { MealCard } from "@/components/meal/MealCard"
import { EmptyState } from "@/components/layout/EmptyState"

export function DashboardClient() {
  const recipes = useRecipes()
  const meals = useMeals()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Recipes section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold" style={{ color: "var(--color-foreground)" }}>
            Recipes
          </h2>
          <Link
            href="/recipes/new"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            style={{ color: "var(--color-primary)", backgroundColor: "var(--color-accent)" }}
          >
            <Plus size={14} />
            New Recipe
          </Link>
        </div>

        {recipes === undefined ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-36 rounded-2xl animate-pulse"
                style={{ backgroundColor: "var(--color-muted)" }} />
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No recipes yet"
            description="Start a conversation to create your first recipe. The AI will help you build it step by step."
            action={{ label: "Create first recipe", href: "/recipes/new" }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>

      {/* Meals section */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold" style={{ color: "var(--color-foreground)" }}>
            Meals
          </h2>
          <Link
            href="/meals/new"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            style={{ color: "#C2410C", backgroundColor: "#FFF7ED" }}
          >
            <Plus size={14} />
            New Meal
          </Link>
        </div>

        {meals === undefined ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-28 rounded-2xl animate-pulse"
                style={{ backgroundColor: "var(--color-muted)" }} />
            ))}
          </div>
        ) : meals.length === 0 ? (
          <EmptyState
            icon={Utensils}
            title="No meals yet"
            description="Compose a meal from your recipes. Plan a dinner party, weekly menu, or any occasion."
            action={{ label: "Plan first meal", href: "/meals/new" }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
