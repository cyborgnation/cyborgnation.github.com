"use client"

import Link from "next/link"
import { ChefHat, Utensils, Dumbbell, ArrowRight } from "lucide-react"
import { useRecipes } from "@/lib/hooks/useRecipes"
import { useMeals } from "@/lib/hooks/useMeals"
import { useMealPreps } from "@/lib/hooks/useMealPreps"
import { RecipeCard } from "@/components/recipe/RecipeCard"
import { MealCard } from "@/components/meal/MealCard"
import { MealPrepCard } from "@/components/meal-prep/MealPrepCard"
import { EmptyState } from "@/components/layout/EmptyState"

const quickActions = [
  {
    href: "/recipes/new",
    icon: ChefHat,
    title: "New Recipe",
    desc: "Chat with AI to build a recipe step by step",
    iconColor: "#4338CA",
    iconBg: "#EEF2FF",
  },
  {
    href: "/meals/new",
    icon: Utensils,
    title: "New Meal",
    desc: "Compose a complete meal for any occasion",
    iconColor: "#92400E",
    iconBg: "#FEF3C7",
  },
  {
    href: "/meal-prep/new",
    icon: Dumbbell,
    title: "New Meal Prep",
    desc: "Plan your fitness week with macro tracking",
    iconColor: "#0F766E",
    iconBg: "#F0FDFA",
  },
]

function SectionSkeleton({ count, height }: { count: number; height: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`${height} rounded-2xl animate-pulse`}
          style={{ backgroundColor: "var(--color-muted)" }} />
      ))}
    </div>
  )
}

export function DashboardClient() {
  const recipes = useRecipes()
  const meals = useMeals()
  const mealPreps = useMealPreps()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Quick create — always visible at the top */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold mb-6"
          style={{ fontFamily: '"Lora", Georgia, serif', color: "var(--color-foreground)" }}>
          What are you cooking?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="block group">
              <div className="flex items-center gap-4 p-5 rounded-2xl border card-hover"
                style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: action.iconBg, color: action.iconColor }}>
                  <action.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base leading-snug"
                    style={{ fontFamily: '"Lora", Georgia, serif', color: "var(--color-foreground)" }}>
                    {action.title}
                  </h3>
                  <p className="text-xs mt-0.5 leading-snug"
                    style={{ color: "var(--color-muted-foreground)" }}>
                    {action.desc}
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5"
                  style={{ backgroundColor: action.iconBg, color: action.iconColor }}>
                  <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recipes */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold mb-5"
          style={{ fontFamily: '"Lora", Georgia, serif', color: "var(--color-foreground)" }}>
          Recipes
        </h2>
        {recipes === undefined ? (
          <SectionSkeleton count={3} height="h-36" />
        ) : recipes.length === 0 ? (
          <EmptyState
            icon={ChefHat}
            title="No recipes yet"
            description="Start a conversation to create your first recipe. AI will help you build it step by step."
            action={{ label: "Create first recipe", href: "/recipes/new" }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
          </div>
        )}
      </div>

      {/* Meals */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold mb-5"
          style={{ fontFamily: '"Lora", Georgia, serif', color: "var(--color-foreground)" }}>
          Meals
        </h2>
        {meals === undefined ? (
          <SectionSkeleton count={2} height="h-28" />
        ) : meals.length === 0 ? (
          <EmptyState
            icon={Utensils}
            title="No meals yet"
            description="Compose a meal from your recipes. Plan a dinner party, weekly menu, or any occasion."
            action={{ label: "Plan first meal", href: "/meals/new" }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {meals.map((meal) => <MealCard key={meal.id} meal={meal} />)}
          </div>
        )}
      </div>

      {/* Meal Prep */}
      <div>
        <h2 className="text-lg font-semibold mb-5"
          style={{ fontFamily: '"Lora", Georgia, serif', color: "var(--color-foreground)" }}>
          Meal Prep
        </h2>
        {mealPreps === undefined ? (
          <SectionSkeleton count={2} height="h-28" />
        ) : mealPreps.length === 0 ? (
          <EmptyState
            icon={Dumbbell}
            title="No meal preps yet"
            description="Plan a full week of prep-ahead meals. AI tracks macros and helps you hit your fitness goals."
            action={{ label: "Plan first week", href: "/meal-prep/new" }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mealPreps.map((mp) => <MealPrepCard key={mp.id} mealPrep={mp} />)}
          </div>
        )}
      </div>
    </div>
  )
}
