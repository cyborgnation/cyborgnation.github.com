"use client"

import Link from "next/link"
import { Clock, Users, Trash2, ChefHat } from "lucide-react"
import type { Recipe } from "@/types/recipe"
import { deleteRecipe } from "@/lib/db/recipes"
import { toast } from "sonner"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm(`Delete "${recipe.title}"?`)) return
    try {
      await deleteRecipe(recipe.id)
      toast.success("Recipe deleted")
    } catch {
      toast.error("Failed to delete recipe")
    }
  }

  return (
    <Link href={`/recipes/${recipe.id}`} className="block group">
      <div
        className="rounded-2xl p-5 border card-hover relative overflow-hidden"
        style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
      >
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50"
          style={{ color: "var(--color-destructive)" }}
          title="Delete recipe"
        >
          <Trash2 size={14} />
        </button>

        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: "var(--color-accent)", color: "var(--color-primary)" }}>
            <ChefHat size={18} />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm leading-snug truncate pr-6 serif"
              style={{ fontFamily: '"Lora", Georgia, serif', color: "var(--color-foreground)" }}>
              {recipe.title}
            </h3>
            {recipe.description && (
              <p className="text-xs mt-0.5 line-clamp-2"
                style={{ color: "var(--color-muted-foreground)" }}>
                {recipe.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs" style={{ color: "var(--color-muted-foreground)" }}>
          {totalTime > 0 && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {totalTime} min
            </span>
          )}
          {recipe.servings > 0 && (
            <span className="flex items-center gap-1">
              <Users size={12} />
              {recipe.servings}
            </span>
          )}
          {recipe.ingredients.length > 0 && (
            <span>{recipe.ingredients.length} ingredients</span>
          )}
        </div>

        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {recipe.tags.slice(0, 4).map((tag) => (
              <span key={tag}
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ backgroundColor: "var(--color-accent)", color: "var(--color-accent-foreground)" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
