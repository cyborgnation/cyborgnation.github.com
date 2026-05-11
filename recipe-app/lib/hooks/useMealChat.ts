"use client"

import { useState, useCallback } from "react"
import { useChat } from "./useChat"
import type { Meal } from "@/types/meal"
import type { ProviderConfig } from "@/types/ai"
import type { Message } from "@/types/message"
import { DEFAULT_PROVIDER_CONFIG } from "@/types/ai"
import type { ExistingRecipeSummary } from "@/lib/ai/prompts/meal-planning"

export interface ParsedMealPlan {
  title: string
  description: string
  suggestions: Array<{
    role: "main" | "side" | "dessert" | "drink"
    title: string
    recipeId: string | null
    isNew: boolean
  }>
}

function extractMealPlan(text: string): ParsedMealPlan | null {
  const fenceRegex = /```json\s*([\s\S]*?)```/g
  let match
  while ((match = fenceRegex.exec(text)) !== null) {
    try {
      const parsed = JSON.parse(match[1])
      if (parsed.__type === "meal_plan") {
        const { __type, ...data } = parsed
        return data as ParsedMealPlan
      }
    } catch {
      // continue
    }
  }
  return null
}

interface UseMealChatOptions {
  meal?: Meal
  existingRecipes?: ExistingRecipeSummary[]
  config?: ProviderConfig
  onMessagesChange?: (messages: Message[]) => void
}

export function useMealChat({ meal: _meal, existingRecipes = [], config, onMessagesChange }: UseMealChatOptions = {}) {
  const [pendingMealPlan, setPendingMealPlan] = useState<ParsedMealPlan | null>(null)
  const [providerConfig, setProviderConfig] = useState<ProviderConfig>(
    config ?? DEFAULT_PROVIDER_CONFIG
  )

  const chat = useChat({
    endpoint: "/api/chat/meal",
    buildExtraBody: () => ({
      providerId: providerConfig.providerId,
      modelId: providerConfig.modelId,
      existingRecipes,
    }),
    onComplete: (fullText, finalMessages) => {
      const parsed = extractMealPlan(fullText)
      if (parsed) setPendingMealPlan(parsed)
      onMessagesChange?.(finalMessages)
    },
  })

  const clearPendingMealPlan = useCallback(() => setPendingMealPlan(null), [])

  return { ...chat, pendingMealPlan, clearPendingMealPlan, providerConfig, setProviderConfig }
}
