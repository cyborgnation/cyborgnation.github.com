"use client"

import Link from "next/link"
import { useRecipe } from "@/lib/hooks/useRecipes"
import { CookingLayout } from "@/components/cooking/CookingLayout"
import { CookingRecipeView } from "@/components/cooking/CookingRecipeView"

interface RecipeCookClientProps {
  id: string
}

export function RecipeCookClient({ id }: RecipeCookClientProps) {
  const recipe = useRecipe(id)

  if (recipe === undefined) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--color-border)", borderTopColor: "var(--color-primary)" }} />
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4"
        style={{ backgroundColor: "var(--color-background)" }}>
        <p style={{ color: "var(--color-muted-foreground)" }}>Recipe not found.</p>
        <Link href="/" className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
          Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <CookingLayout title={recipe.title}>
      <CookingRecipeView recipe={recipe} />
    </CookingLayout>
  )
}
