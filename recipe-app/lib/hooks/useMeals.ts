"use client"

import { useLiveQuery } from "dexie-react-hooks"
import { getDB } from "@/lib/db/schema"
import type { Meal } from "@/types/meal"

export function useMeals(): Meal[] | undefined {
  return useLiveQuery(() => getDB().meals.orderBy("updatedAt").reverse().toArray())
}

export function useMeal(id: string): Meal | undefined {
  return useLiveQuery(() => getDB().meals.get(id), [id])
}
