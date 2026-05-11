import Dexie, { type EntityTable } from "dexie"
import type { Recipe } from "@/types/recipe"
import type { Meal } from "@/types/meal"

class RecipeAppDB extends Dexie {
  recipes!: EntityTable<Recipe, "id">
  meals!: EntityTable<Meal, "id">

  constructor() {
    super("recipe-app-db")
    this.version(1).stores({
      recipes: "id, title, createdAt, updatedAt, *tags",
      meals: "id, title, createdAt, updatedAt",
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
