"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useMealPrep } from "@/lib/hooks/useMealPreps"
import { useRecipes } from "@/lib/hooks/useRecipes"
import { useMealPrepChat } from "@/lib/hooks/useMealPrepChat"
import { setMealPrepConversations } from "@/lib/db/meal-preps"
import { ChatPanel } from "@/components/chat/ChatPanel"
import { MacroSummary } from "@/components/meal-prep/MacroSummary"
import { MealPrepRecipeList } from "@/components/meal-prep/MealPrepRecipeList"
import type { Recipe } from "@/types/recipe"

interface MealPrepDetailClientProps {
  id: string
}

export function MealPrepDetailClient({ id }: MealPrepDetailClientProps) {
  const mealPrep = useMealPrep(id)
  const allRecipes = useRecipes()
  const [mobileTab, setMobileTab] = useState<"overview" | "chat">("overview")

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
    macros: r.macros,
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
  } = useMealPrepChat({
    existingRecipes,
    onMessagesChange: async (msgs) => {
      if (mealPrep) {
        await setMealPrepConversations(mealPrep.id, msgs)
      }
    },
  })

  useEffect(() => {
    if (mealPrep && mealPrep.conversations.length > 0 && messages.length === 0) {
      setMessages(mealPrep.conversations)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mealPrep?.id])

  if (mealPrep === undefined) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-56px)]">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--color-border)", borderTopColor: "#0891B2" }} />
      </div>
    )
  }

  if (!mealPrep) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] gap-4">
        <p style={{ color: "var(--color-muted-foreground)" }}>Meal prep not found.</p>
        <Link href="/" className="text-sm font-medium" style={{ color: "#0891B2" }}>
          Back to dashboard
        </Link>
      </div>
    )
  }

  // Build macro entries from recipe refs that have macros
  const macroEntries = mealPrep.recipeRefs
    .map((ref) => {
      const recipe = recipesMap[ref.recipeId]
      const macros = recipe?.macros ?? ref.estimatedMacros
      if (!macros) return null
      return {
        calories: macros.calories,
        protein: macros.protein,
        carbs: macros.carbs,
        fat: macros.fat,
        fiber: recipe?.macros?.fiber,
        servingsPerWeek: ref.servingsPerWeek,
      }
    })
    .filter((e): e is NonNullable<typeof e> => e !== null)

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Page header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b shrink-0"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
        <Link href="/" className="p-1.5 rounded-lg transition-colors hover:bg-muted"
          style={{ color: "var(--color-muted-foreground)" }}>
          <ArrowLeft size={16} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold truncate" style={{ color: "var(--color-foreground)" }}>
            {mealPrep.title}
          </h1>
          {mealPrep.description && (
            <p className="text-xs truncate" style={{ color: "var(--color-muted-foreground)" }}>
              {mealPrep.description}
            </p>
          )}
        </div>
      </div>

      {/* Mobile tab switcher */}
      <div className="flex border-b shrink-0 md:hidden" style={{ borderColor: "var(--color-border)" }}>
        {([["overview", "Overview"], ["chat", "Chat"]] as const).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className="flex-1 py-2.5 text-sm font-medium transition-colors"
            style={mobileTab === tab ? {
              color: "#0891B2",
              borderBottom: "2px solid #0891B2",
            } : { color: "var(--color-muted-foreground)" }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Split: overview + chat */}
      <div className="flex-1 flex overflow-hidden">
        {/* Overview: macros + recipe list */}
        <div className={mobileTab === "overview" ? "flex flex-col flex-1 overflow-y-auto p-4 gap-6" : "hidden md:flex md:flex-col md:flex-1 md:overflow-y-auto md:p-6 md:gap-6"}>
          {macroEntries.length > 0 && (
            <MacroSummary entries={macroEntries} />
          )}
          {macroEntries.length === 0 && mealPrep.recipeRefs.length > 0 && (
            <div className="rounded-2xl border p-4 text-sm"
              style={{ borderColor: "var(--color-border)", color: "var(--color-muted-foreground)" }}>
              No macro data available yet. Open a recipe and let the AI generate it to populate macros.
            </div>
          )}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-4"
              style={{ color: "var(--color-muted-foreground)" }}>
              Weekly Dishes
            </h2>
            <MealPrepRecipeList recipeRefs={mealPrep.recipeRefs} recipes={recipesMap} />
          </div>
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
            placeholder="Ask about this meal prep plan…"
            className="h-full"
          />
        </div>
      </div>
    </div>
  )
}
