"use client"

import { useLiveQuery } from "dexie-react-hooks"
import { getDB } from "@/lib/db/schema"
import type { Recipe } from "@/types/recipe"

export function useRecipes(): Recipe[] | undefined {
  return useLiveQuery(() => getDB().recipes.orderBy("updatedAt").reverse().toArray())
}

export function useRecipe(id: string): Recipe | undefined {
  return useLiveQuery(() => getDB().recipes.get(id), [id])
}
