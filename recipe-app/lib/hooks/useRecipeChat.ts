"use client"

import { useState, useCallback } from "react"
import { useChat } from "./useChat"
import { extractRecipeJSON, type ParsedRecipeJSON } from "@/lib/utils/recipe-parser"
import type { Recipe } from "@/types/recipe"
import type { ProviderConfig } from "@/types/ai"
import type { Message } from "@/types/message"
import { DEFAULT_PROVIDER_CONFIG } from "@/types/ai"

interface UseRecipeChatOptions {
  recipe?: Recipe
  config?: ProviderConfig
  onMessagesChange?: (messages: Message[]) => void
}

export function useRecipeChat({ recipe, config, onMessagesChange }: UseRecipeChatOptions = {}) {
  const [pendingRecipe, setPendingRecipe] = useState<ParsedRecipeJSON | null>(null)
  const [providerConfig, setProviderConfig] = useState<ProviderConfig>(
    config ?? DEFAULT_PROVIDER_CONFIG
  )

  const chat = useChat({
    endpoint: "/api/chat/recipe",
    buildExtraBody: () => ({
      providerId: providerConfig.providerId,
      modelId: providerConfig.modelId,
      recipe: recipe ?? null,
    }),
    onComplete: (fullText, finalMessages) => {
      const parsed = extractRecipeJSON(fullText)
      if (parsed) setPendingRecipe(parsed)
      onMessagesChange?.(finalMessages)
    },
  })

  const clearPendingRecipe = useCallback(() => setPendingRecipe(null), [])

  return { ...chat, pendingRecipe, clearPendingRecipe, providerConfig, setProviderConfig }
}
