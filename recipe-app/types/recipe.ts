import type { Message } from "./message"

export interface Macros {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
}

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
  macros?: Macros
  createdAt: number
  updatedAt: number
}

export type RecipeCreate = Omit<Recipe, "id" | "createdAt" | "updatedAt">
export type RecipeUpdate = Partial<RecipeCreate>
