import type { Message } from "./message"

export type RecipeRole = "main" | "side" | "dessert" | "drink"

export interface RecipeRef {
  recipeId: string
  role: RecipeRole
}

export interface Meal {
  id: string
  title: string
  description: string
  recipeRefs: RecipeRef[]
  conversations: Message[]
  modelId: string
  providerId: string
  createdAt: number
  updatedAt: number
}

export type MealCreate = Omit<Meal, "id" | "createdAt" | "updatedAt">
export type MealUpdate = Partial<MealCreate>
