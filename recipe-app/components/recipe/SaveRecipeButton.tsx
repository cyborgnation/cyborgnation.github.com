"use client"

import { useState } from "react"
import { Save, Check, X } from "lucide-react"
import { createRecipe, updateRecipe } from "@/lib/db/recipes"
import type { ParsedRecipeJSON } from "@/lib/utils/recipe-parser"
import type { Recipe } from "@/types/recipe"
import type { ProviderConfig } from "@/types/ai"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface SaveRecipeButtonProps {
  pendingRecipe: ParsedRecipeJSON
  existingRecipe?: Recipe
  providerConfig: ProviderConfig
  onSaved?: (recipe: Recipe) => void
  onDismiss: () => void
}

export function SaveRecipeButton({
  pendingRecipe,
  existingRecipe,
  providerConfig,
  onSaved,
  onDismiss,
}: SaveRecipeButtonProps) {
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  async function handleSave() {
    setSaving(true)
    try {
      if (pendingRecipe.type === "recipe") {
        const data = pendingRecipe.data
        const recipe = await createRecipe({
          title: data.title ?? "Untitled Recipe",
          description: data.description ?? "",
          servings: data.servings ?? 4,
          prepTime: data.prepTime ?? 0,
          cookTime: data.cookTime ?? 0,
          tags: data.tags ?? [],
          ingredients: data.ingredients ?? [],
          steps: data.steps ?? [],
          conversations: [],
          modelId: providerConfig.modelId,
          providerId: providerConfig.providerId,
        })
        toast.success("Recipe saved!")
        onSaved?.(recipe)
        router.push(`/recipes/${recipe.id}`)
      } else if (pendingRecipe.type === "recipe_update" && existingRecipe) {
        await updateRecipe(existingRecipe.id, {
          ...pendingRecipe.data,
          modelId: providerConfig.modelId,
          providerId: providerConfig.providerId,
        })
        toast.success("Recipe updated!")
        onSaved?.(existingRecipe)
        onDismiss()
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  const isUpdate = pendingRecipe.type === "recipe_update"
  const label = isUpdate ? "Apply Changes" : "Save Recipe"

  return (
    <div className="flex items-center gap-2 p-3 rounded-xl border"
      style={{ backgroundColor: "var(--color-accent)", borderColor: "var(--color-primary)" }}>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold" style={{ color: "var(--color-primary)" }}>
          {isUpdate ? "Recipe update ready" : "Recipe ready to save"}
        </p>
        {!isUpdate && pendingRecipe.data.title && (
          <p className="text-xs truncate mt-0.5" style={{ color: "var(--color-accent-foreground)" }}>
            {pendingRecipe.data.title}
          </p>
        )}
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity disabled:opacity-60 hover:opacity-90"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        {saving ? <Check size={12} /> : <Save size={12} />}
        {saving ? "Saving..." : label}
      </button>
      <button
        onClick={onDismiss}
        className="p-1.5 rounded-lg transition-colors hover:bg-white/50"
        style={{ color: "var(--color-muted-foreground)" }}
        title="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  )
}
