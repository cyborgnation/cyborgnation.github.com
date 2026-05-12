import type { Message } from "./message"

export interface MealPrepRecipeRef {
  recipeId: string
  servingsPerWeek: number
  estimatedMacros?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

export interface MealPrep {
  id: string
  title: string
  description: string
  recipeRefs: MealPrepRecipeRef[]
  conversations: Message[]
  modelId: string
  providerId: string
  createdAt: number
  updatedAt: number
}

export type MealPrepCreate = Omit<MealPrep, "id" | "createdAt" | "updatedAt">
export type MealPrepUpdate = Partial<MealPrepCreate>
