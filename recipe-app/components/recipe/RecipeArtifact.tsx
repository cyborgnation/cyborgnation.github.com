"use client"

import Link from "next/link"
import { Clock, Users, Timer, ChefHat } from "lucide-react"
import type { Recipe } from "@/types/recipe"

interface RecipeArtifactProps {
  recipe: Recipe
}

export function RecipeArtifact({ recipe }: RecipeArtifactProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b shrink-0"
        style={{ borderColor: "var(--color-border)" }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold leading-tight mb-1"
              style={{ color: "var(--color-foreground)" }}>
              {recipe.title}
            </h1>
            {recipe.description && (
              <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                {recipe.description}
              </p>
            )}
          </div>
          <Link
            href={`/recipes/${recipe.id}/cook`}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <ChefHat size={15} />
            Cook
          </Link>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 mt-4 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
          {recipe.servings > 0 && (
            <span className="flex items-center gap-1.5">
              <Users size={14} />
              {recipe.servings} servings
            </span>
          )}
          {recipe.prepTime > 0 && (
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {recipe.prepTime} min prep
            </span>
          )}
          {recipe.cookTime > 0 && (
            <span className="flex items-center gap-1.5">
              <Timer size={14} />
              {recipe.cookTime} min cook
            </span>
          )}
        </div>

        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {recipe.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: "var(--color-accent)", color: "var(--color-accent-foreground)" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x"
        style={{ borderColor: "var(--color-border)" }}>
        {/* Ingredients */}
        <div className="p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-4"
            style={{ color: "var(--color-muted-foreground)" }}>
            Ingredients
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }} />
                <span>
                  <span className="font-medium">{ing.amount} {ing.unit}</span>{" "}
                  <span>{ing.name}</span>
                  {ing.notes && (
                    <span className="text-xs ml-1" style={{ color: "var(--color-muted-foreground)" }}>
                      ({ing.notes})
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-4"
            style={{ color: "var(--color-muted-foreground)" }}>
            Instructions
          </h2>
          <ol className="space-y-4">
            {[...recipe.steps].sort((a, b) => a.order - b.order).map((step) => (
              <li key={step.order} className="flex gap-3 text-sm">
                <span
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {step.order}
                </span>
                <div>
                  <p className="leading-relaxed">{step.instruction}</p>
                  {step.duration && (
                    <p className="text-xs mt-1 flex items-center gap-1"
                      style={{ color: "var(--color-muted-foreground)" }}>
                      <Timer size={11} />
                      {step.duration} min
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
