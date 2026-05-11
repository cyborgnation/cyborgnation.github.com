import { getDB } from "./schema"
import type { Recipe, RecipeCreate, RecipeUpdate } from "@/types/recipe"
import type { Message } from "@/types/message"

export async function getAllRecipes(): Promise<Recipe[]> {
  return getDB().recipes.orderBy("updatedAt").reverse().toArray()
}

export async function getRecipeById(id: string): Promise<Recipe | undefined> {
  return getDB().recipes.get(id)
}

export async function createRecipe(data: RecipeCreate): Promise<Recipe> {
  const now = Date.now()
  const recipe: Recipe = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  }
  await getDB().recipes.add(recipe)
  return recipe
}

export async function updateRecipe(id: string, data: RecipeUpdate): Promise<void> {
  await getDB().recipes.update(id, { ...data, updatedAt: Date.now() })
}

export async function deleteRecipe(id: string): Promise<void> {
  await getDB().recipes.delete(id)
}

export async function appendMessageToRecipe(id: string, message: Message): Promise<void> {
  await getDB().recipes.where("id").equals(id).modify((r) => {
    r.conversations.push(message)
    r.updatedAt = Date.now()
  })
}

export async function setRecipeConversations(id: string, conversations: Message[]): Promise<void> {
  await getDB().recipes.update(id, { conversations, updatedAt: Date.now() })
}
