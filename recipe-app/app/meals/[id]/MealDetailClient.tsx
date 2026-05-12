"use client"

import { useEffect, useMemo, useState } from "react"
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
  const [mobileTab, setMobileTab] = useState<"recipes" | "chat">("recipes")

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
          style={{ background: "linear-gradient(135deg, #EA580C 0%, #DC2626 100%)" }}
        >
          <ChefHat size={14} />
          Cook
        </Link>
      </div>

      {/* Mobile tab switcher */}
      <div className="flex border-b shrink-0 md:hidden" style={{ borderColor: "var(--color-border)" }}>
        {(["recipes", "chat"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className="flex-1 py-2.5 text-sm font-medium capitalize transition-colors"
            style={mobileTab === tab ? {
              color: "var(--color-primary)",
              borderBottom: "2px solid var(--color-primary)",
            } : { color: "var(--color-muted-foreground)" }}
          >
            {tab === "recipes" ? "Recipes" : "Chat"}
          </button>
        ))}
      </div>

      {/* Split: recipe list + chat */}
      <div className="flex-1 flex overflow-hidden">
        {/* Recipe list */}
        <div className={mobileTab === "recipes" ? "flex flex-col flex-1 overflow-y-auto p-6" : "hidden md:flex md:flex-col md:flex-1 md:overflow-y-auto md:p-6"}>
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-4"
            style={{ color: "var(--color-muted-foreground)" }}>
            Recipes in this meal
          </h2>
          <MealRecipeList recipeRefs={meal.recipeRefs} recipes={recipesMap} />
        </div>

        {/* Chat */}
        <div
          className={mobileTab === "chat" ? "flex flex-col flex-1 overflow-hidden md:w-96 md:flex-none md:border-l" : "hidden md:flex md:flex-col md:w-96 md:shrink-0 md:border-l md:overflow-hidden"}
          style={{ borderColor: "var(--color-border)" }}
        >
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
