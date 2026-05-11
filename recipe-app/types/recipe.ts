import type { Message } from "./message"

export interface Ingredient {
  name: string
  amount: number
  unit: string
  notes?: string
}

export interface RecipeStep {
  order: number
  instruction: string
  duration?: number
}

export interface Recipe {
  id: string
  title: string
  description: string
  servings: number
  prepTime: number
  cookTime: number
  tags: string[]
  ingredients: Ingredient[]
  steps: RecipeStep[]
  conversations: Message[]
  modelId: string
  providerId: string
  createdAt: number
  updatedAt: number
}

export type RecipeCreate = Omit<Recipe, "id" | "createdAt" | "updatedAt">
export type RecipeUpdate = Partial<RecipeCreate>
