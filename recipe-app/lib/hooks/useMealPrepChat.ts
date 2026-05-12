"use client"

import { useState, useCallback } from "react"
import { useChat } from "./useChat"
import type { ProviderConfig } from "@/types/ai"
import type { Message } from "@/types/message"
import { DEFAULT_PROVIDER_CONFIG } from "@/types/ai"
import type { ExistingRecipeSummaryForPrep } from "@/lib/ai/prompts/meal-prep-planning"

export interface ParsedMealPrepPlan {
  title: string
  description: string
  suggestions: Array<{
    title: string
    servingsPerWeek: number
    recipeId: string | null
    isNew: boolean
    estimatedMacros: {
      calories: number
      protein: number
      carbs: number
      fat: number
    }
  }>
}

function extractMealPrepPlan(text: string): ParsedMealPrepPlan | null {
  const fenceRegex = /```json\s*([\s\S]*?)```/g
  let match
  while ((match = fenceRegex.exec(text)) !== null) {
    try {
      const parsed = JSON.parse(match[1])
      if (parsed.__type === "meal_prep_plan") {
        const { __type, ...data } = parsed
        return data as ParsedMealPrepPlan
      }
    } catch {
      // continue
    }
  }
  return null
}

interface UseMealPrepChatOptions {
  existingRecipes?: ExistingRecipeSummaryForPrep[]
  config?: ProviderConfig
  onMessagesChange?: (messages: Message[]) => void
}

export function useMealPrepChat({ existingRecipes = [], config, onMessagesChange }: UseMealPrepChatOptions = {}) {
  const [pendingMealPrepPlan, setPendingMealPrepPlan] = useState<ParsedMealPrepPlan | null>(null)
  const [providerConfig, setProviderConfig] = useState<ProviderConfig>(
    config ?? DEFAULT_PROVIDER_CONFIG
  )

  const chat = useChat({
    endpoint: "/api/chat/meal-prep",
    buildExtraBody: () => ({
      providerId: providerConfig.providerId,
      modelId: providerConfig.modelId,
      existingRecipes,
    }),
    onComplete: (fullText, finalMessages) => {
      const parsed = extractMealPrepPlan(fullText)
      if (parsed) setPendingMealPrepPlan(parsed)
      onMessagesChange?.(finalMessages)
    },
  })

  const clearPendingMealPrepPlan = useCallback(() => setPendingMealPrepPlan(null), [])

  return { ...chat, pendingMealPrepPlan, clearPendingMealPrepPlan, providerConfig, setProviderConfig }
}
