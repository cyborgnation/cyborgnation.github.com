import Dexie, { type EntityTable } from "dexie"
import type { Recipe } from "@/types/recipe"
import type { Meal } from "@/types/meal"
import type { MealPrep } from "@/types/meal-prep"

class RecipeAppDB extends Dexie {
  recipes!: EntityTable<Recipe, "id">
  meals!: EntityTable<Meal, "id">
  mealPreps!: EntityTable<MealPrep, "id">

  constructor() {
    super("recipe-app-db")
    this.version(1).stores({
      recipes: "id, title, createdAt, updatedAt, *tags",
      meals: "id, title, createdAt, updatedAt",
    })
    this.version(2).stores({
      recipes: "id, title, createdAt, updatedAt, *tags",
      meals: "id, title, createdAt, updatedAt",
      mealPreps: "id, title, createdAt, updatedAt",
    })
  }
}

let db: RecipeAppDB | null = null

export function getDB(): RecipeAppDB {
  if (typeof window === "undefined") {
    throw new Error("DB is only available in the browser")
  }
  if (!db) {
    db = new RecipeAppDB()
  }
  return db
}
