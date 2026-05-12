import { getDB } from "./schema"
import type { MealPrep, MealPrepCreate, MealPrepUpdate } from "@/types/meal-prep"
import type { Message } from "@/types/message"

export async function getAllMealPreps(): Promise<MealPrep[]> {
  return getDB().mealPreps.orderBy("updatedAt").reverse().toArray()
}

export async function getMealPrepById(id: string): Promise<MealPrep | undefined> {
  return getDB().mealPreps.get(id)
}

export async function createMealPrep(data: MealPrepCreate): Promise<MealPrep> {
  const now = Date.now()
  const mealPrep: MealPrep = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  }
  await getDB().mealPreps.add(mealPrep)
  return mealPrep
}

export async function updateMealPrep(id: string, data: MealPrepUpdate): Promise<void> {
  await getDB().mealPreps.update(id, { ...data, updatedAt: Date.now() })
}

export async function deleteMealPrep(id: string): Promise<void> {
  await getDB().mealPreps.delete(id)
}

export async function appendMessageToMealPrep(id: string, message: Message): Promise<void> {
  await getDB().mealPreps.where("id").equals(id).modify((m) => {
    m.conversations.push(message)
    m.updatedAt = Date.now()
  })
}

export async function setMealPrepConversations(id: string, conversations: Message[]): Promise<void> {
  await getDB().mealPreps.update(id, { conversations, updatedAt: Date.now() })
}
