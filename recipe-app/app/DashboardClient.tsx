"use client"

import Link from "next/link"
import { Plus, BookOpen, Utensils, Dumbbell } from "lucide-react"
import { useRecipes } from "@/lib/hooks/useRecipes"
import { useMeals } from "@/lib/hooks/useMeals"
import { useMealPreps } from "@/lib/hooks/useMealPreps"
import { RecipeCard } from "@/components/recipe/RecipeCard"
import { MealCard } from "@/components/meal/MealCard"
import { MealPrepCard } from "@/components/meal-prep/MealPrepCard"
import { EmptyState } from "@/components/layout/EmptyState"

export function DashboardClient() {
  const recipes = useRecipes()
  const meals = useMeals()
  const mealPreps = useMealPreps()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Recipes section */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs font-mono font-black uppercase tracking-widest"
            style={{ color: "var(--color-muted-foreground)" }}>
            Recipes
          </h2>
          <Link
            href="/recipes/new"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono uppercase tracking-wide transition-colors"
            style={{
              color: "#C4B5FD",
              backgroundColor: "rgba(139, 92, 246, 0.12)",
              border: "1px solid rgba(139, 92, 246, 0.25)",
            }}
          >
            <Plus size={13} />
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
            description="Start a conversation to create your first recipe. AI will help you build it step by step."
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
      <div className="mb-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs font-mono font-black uppercase tracking-widest"
            style={{ color: "var(--color-muted-foreground)" }}>
            Meals
          </h2>
          <Link
            href="/meals/new"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono uppercase tracking-wide transition-colors"
            style={{
              color: "#FB923C",
              backgroundColor: "rgba(251, 146, 60, 0.1)",
              border: "1px solid rgba(251, 146, 60, 0.25)",
            }}
          >
            <Plus size={13} />
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

      {/* Meal Prep section */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs font-mono font-black uppercase tracking-widest"
            style={{ color: "var(--color-muted-foreground)" }}>
            Meal Prep
          </h2>
          <Link
            href="/meal-prep/new"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono uppercase tracking-wide transition-colors"
            style={{
              color: "#22D3EE",
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              border: "1px solid rgba(6, 182, 212, 0.25)",
            }}
          >
            <Plus size={13} />
            New Prep
          </Link>
        </div>

        {mealPreps === undefined ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2].map((i) => (
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
    </div>
  )
}
