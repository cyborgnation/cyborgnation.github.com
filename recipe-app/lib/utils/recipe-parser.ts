import type { Recipe, RecipeUpdate } from "@/types/recipe"

export type ParsedRecipeJSON =
  | { type: "recipe"; data: Omit<Recipe, "id" | "conversations" | "modelId" | "providerId" | "createdAt" | "updatedAt"> }
  | { type: "recipe_update"; data: RecipeUpdate }

export function extractRecipeJSON(text: string): ParsedRecipeJSON | null {
  const fenceRegex = /```json\s*([\s\S]*?)```/g
  let match
  while ((match = fenceRegex.exec(text)) !== null) {
    try {
      const parsed = JSON.parse(match[1])
      if (parsed.__type === "recipe") {
        const { __type, ...data } = parsed
        return { type: "recipe", data }
      }
      if (parsed.__type === "recipe_update") {
        const { __type, ...data } = parsed
        return { type: "recipe_update", data }
      }
    } catch {
      // invalid JSON block, keep searching
    }
  }
  return null
}
