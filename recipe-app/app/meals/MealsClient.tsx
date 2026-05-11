"use client"

import Link from "next/link"
import { Plus, Utensils } from "lucide-react"
import { useMeals } from "@/lib/hooks/useMeals"
import { MealCard } from "@/components/meal/MealCard"
import { EmptyState } from "@/components/layout/EmptyState"

export function MealsClient() {
  const meals = useMeals()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold" style={{ color: "var(--color-foreground)" }}>
          Meals
        </h1>
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
          {[1, 2, 3].map((i) => (
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
  )
}
