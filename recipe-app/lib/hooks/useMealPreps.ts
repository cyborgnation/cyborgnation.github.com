"use client"

import { useLiveQuery } from "dexie-react-hooks"
import { getDB } from "@/lib/db/schema"
import type { MealPrep } from "@/types/meal-prep"

export function useMealPreps(): MealPrep[] | undefined {
  return useLiveQuery(() => getDB().mealPreps.orderBy("updatedAt").reverse().toArray())
}

export function useMealPrep(id: string): MealPrep | undefined {
  return useLiveQuery(() => getDB().mealPreps.get(id), [id])
}
