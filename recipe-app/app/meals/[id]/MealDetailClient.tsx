"use client"

import { useEffect, useMemo } from "react"
import { ArrowLeft, ChefHat } from "lucide-react"
import Link from "next/link"
import { useMeal } from "@/lib/hooks/useMeals"
import { useRecipes } from "@/lib/hooks/useRecipes"
import { useMealChat } from "@/lib/hooks/useMealChat"
import { setMealConversations } from "@/lib/db/meals"
import { ChatPanel } from "@/components/chat/ChatPanel"
import { MealRecipeList } from "@/components/meal/MealRecipeList"
import type { Recipe } from "@/types/recipe"

interface MealDetailClientProps {
  id: string
}

export function MealDetailClient({ id }: MealDetailClientProps) {
  const meal = useMeal(id)
  const allRecipes = useRecipes()

  const recipesMap = useMemo<Record<string, Recipe>>(() => {
    const map: Record<string, Recipe> = {}
    for (const r of allRecipes ?? []) map[r.id] = r
    return map
  }, [allRecipes])

  const existingRecipes = (allRecipes ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    tags: r.tags,
    servings: r.servings,
  }))

  const {
    messages,
    setMessages,
    isStreaming,
    streamingContent,
    error,
    send,
    abort,
    providerConfig,
    setProviderConfig,
  } = useMealChat({
    meal: meal ?? undefined,
    existingRecipes,
    onMessagesChange: async (msgs) => {
      if (meal) {
        await setMealConversations(meal.id, msgs)
      }
    },
  })

  useEffect(() => {
    if (meal && meal.conversations.length > 0 && messages.length === 0) {
      setMessages(meal.conversations)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meal?.id])

  if (meal === undefined) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-56px)]">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--color-border)", borderTopColor: "var(--color-primary)" }} />
      </div>
    )
  }

  if (!meal) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] gap-4">
        <p style={{ color: "var(--color-muted-foreground)" }}>Meal not found.</p>
        <Link href="/meals" className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
          Back to meals
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Page header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b shrink-0"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
        <Link href="/meals" className="p-1.5 rounded-lg transition-colors hover:bg-muted"
          style={{ color: "var(--color-muted-foreground)" }}>
          <ArrowLeft size={16} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold truncate" style={{ color: "var(--color-foreground)" }}>
            {meal.title}
          </h1>
          {meal.description && (
            <p className="text-xs truncate" style={{ color: "var(--color-muted-foreground)" }}>
              {meal.description}
            </p>
          )}
        </div>
        <Link
          href={`/meals/${meal.id}/cook`}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#EA580C" }}
        >
          <ChefHat size={14} />
          Cook
        </Link>
      </div>

      {/* Split: recipe list + chat */}
      <div className="flex-1 flex overflow-hidden">
        {/* Recipe list */}
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-4"
            style={{ color: "var(--color-muted-foreground)" }}>
            Recipes in this meal
          </h2>
          <MealRecipeList recipeRefs={meal.recipeRefs} recipes={recipesMap} />
        </div>

        {/* Chat */}
        <div className="w-96 shrink-0 border-l flex flex-col overflow-hidden"
          style={{ borderColor: "var(--color-border)" }}>
          <ChatPanel
            messages={messages}
            isStreaming={isStreaming}
            streamingContent={streamingContent}
            error={error}
            onSend={send}
            onAbort={abort}
            providerConfig={providerConfig}
            onProviderConfigChange={setProviderConfig}
            placeholder="Ask about this meal…"
            className="h-full"
          />
        </div>
      </div>
    </div>
  )
}
