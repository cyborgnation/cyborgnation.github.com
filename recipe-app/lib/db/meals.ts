import { getDB } from "./schema"
import type { Meal, MealCreate, MealUpdate } from "@/types/meal"
import type { Message } from "@/types/message"

export async function getAllMeals(): Promise<Meal[]> {
  return getDB().meals.orderBy("updatedAt").reverse().toArray()
}

export async function getMealById(id: string): Promise<Meal | undefined> {
  return getDB().meals.get(id)
}

export async function createMeal(data: MealCreate): Promise<Meal> {
  const now = Date.now()
  const meal: Meal = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  }
  await getDB().meals.add(meal)
  return meal
}

export async function updateMeal(id: string, data: MealUpdate): Promise<void> {
  await getDB().meals.update(id, { ...data, updatedAt: Date.now() })
}

export async function deleteMeal(id: string): Promise<void> {
  await getDB().meals.delete(id)
}

export async function appendMessageToMeal(id: string, message: Message): Promise<void> {
  await getDB().meals.where("id").equals(id).modify((m) => {
    m.conversations.push(message)
    m.updatedAt = Date.now()
  })
}

export async function setMealConversations(id: string, conversations: Message[]): Promise<void> {
  await getDB().meals.update(id, { conversations, updatedAt: Date.now() })
}
