"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Plus, Check, Dumbbell, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChatPanel } from "@/components/chat/ChatPanel"
import { useMealPrepChat, type ParsedMealPrepPlan } from "@/lib/hooks/useMealPrepChat"
import { useRecipes } from "@/lib/hooks/useRecipes"
import { createMealPrep } from "@/lib/db/meal-preps"
import { createRecipe, updateRecipe } from "@/lib/db/recipes"
import { extractRecipeJSON } from "@/lib/utils/recipe-parser"
import { toast } from "sonner"
import type { Message } from "@/types/message"

export function NewMealPrepClient() {
  const router = useRouter()
  const recipes = useRecipes()
  const [saving, setSaving] = useState(false)
  const [savedPlan, setSavedPlan] = useState<ParsedMealPrepPlan | null>(null)
  const [showPlanSheet, setShowPlanSheet] = useState(false)

  const existingRecipes = (recipes ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    tags: r.tags,
    servings: r.servings,
    macros: r.macros,
  }))

  const {
    messages,
    isStreaming,
    streamingContent,
    error,
    send,
    abort,
    pendingMealPrepPlan,
    clearPendingMealPrepPlan,
    providerConfig,
    setProviderConfig,
  } = useMealPrepChat({ existingRecipes })

  useEffect(() => {
    const stored = localStorage.getItem("preferred-model")
    if (stored) {
      const [providerId, modelId] = stored.split("::")
      if (providerId && modelId) setProviderConfig({ providerId, modelId })
    }
  }, [setProviderConfig])

  const activePlan = savedPlan ?? pendingMealPrepPlan

  async function handleSaveMealPrep() {
    if (!activePlan) return
    setSaving(true)
    try {
      const newStubs: Array<{ recipeId: string; title: string }> = []

      const resolvedRefs = await Promise.all(
        activePlan.suggestions.map(async (s) => {
          if (s.recipeId) {
            return { recipeId: s.recipeId, servingsPerWeek: s.servingsPerWeek, estimatedMacros: s.estimatedMacros }
          }
          const stub = await createRecipe({
            title: s.title,
            description: "",
            servings: 0,
            prepTime: 0,
            cookTime: 0,
            tags: [],
            ingredients: [],
            steps: [],
            conversations: [],
            modelId: providerConfig.modelId,
            providerId: providerConfig.providerId,
          })
          newStubs.push({ recipeId: stub.id, title: s.title })
          return { recipeId: stub.id, servingsPerWeek: s.servingsPerWeek, estimatedMacros: s.estimatedMacros }
        })
      )

      const mealPrep = await createMealPrep({
        title: activePlan.title,
        description: activePlan.description,
        recipeRefs: resolvedRefs,
        conversations: messages,
        modelId: providerConfig.modelId,
        providerId: providerConfig.providerId,
      })

      for (const { recipeId, title } of newStubs) {
        generateRecipe(recipeId, title, providerConfig.providerId, providerConfig.modelId)
          .catch(() => {})
      }

      toast.success(`Meal prep saved! Generating ${newStubs.length} recipe${newStubs.length !== 1 ? "s" : ""} in the background…`)
      router.push(`/meal-prep/${mealPrep.id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Page header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b shrink-0"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
        <Link href="/" className="p-1.5 rounded-lg transition-colors hover:bg-muted"
          style={{ color: "var(--color-muted-foreground)" }}>
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
            New Meal Prep
          </h1>
          <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
            Describe your fitness goals and AI will plan a full week of meal prep.
          </p>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Chat */}
        <div className="flex-1 overflow-hidden">
          <ChatPanel
            messages={messages}
            isStreaming={isStreaming}
            streamingContent={streamingContent}
            error={error}
            onSend={send}
            onAbort={abort}
            providerConfig={providerConfig}
            onProviderConfigChange={setProviderConfig}
            placeholder="Describe your fitness goals, macro targets, dietary preferences…"
            className="h-full"
          />
        </div>

        {/* Meal prep plan preview — desktop sidebar */}
        {activePlan && (
          <div className="hidden md:flex md:flex-col w-80 shrink-0 border-l overflow-y-auto p-4"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
            <PrepPlanContent
              plan={activePlan}
              saving={saving}
              onClear={clearPendingMealPrepPlan}
              onSave={handleSaveMealPrep}
            />
          </div>
        )}
      </div>

      {/* Mobile: floating "View Plan" button */}
      {activePlan && (
        <button
          onClick={() => setShowPlanSheet(true)}
          className="md:hidden fixed bottom-20 right-4 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg z-30 transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#059669" }}
        >
          <Dumbbell size={15} />
          View Plan ({activePlan.suggestions.length})
        </button>
      )}

      {/* Mobile: plan bottom sheet */}
      {showPlanSheet && activePlan && (
        <div
          className="md:hidden fixed inset-0 z-50 flex flex-col justify-end"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setShowPlanSheet(false)}
        >
          <div
            className="rounded-t-2xl max-h-[80vh] overflow-y-auto p-4"
            style={{ backgroundColor: "var(--color-card)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
                Meal Prep Plan
              </span>
              <button
                onClick={() => setShowPlanSheet(false)}
                className="p-1.5 rounded-lg"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                <X size={16} />
              </button>
            </div>
            <PrepPlanContent
              plan={activePlan}
              saving={saving}
              onClear={() => { clearPendingMealPrepPlan(); setShowPlanSheet(false) }}
              onSave={handleSaveMealPrep}
            />
          </div>
        </div>
      )}
    </div>
  )
}

interface PrepPlanContentProps {
  plan: ParsedMealPrepPlan
  saving: boolean
  onClear: () => void
  onSave: () => void
}

function PrepPlanContent({ plan, saving, onClear, onSave }: PrepPlanContentProps) {
  return (
    <>
      <div className="flex items-start justify-between gap-2 mb-4">
        <div>
          <h2 className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
            {plan.title}
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-muted-foreground)" }}>
            {plan.description}
          </p>
        </div>
        <button
          onClick={onClear}
          className="text-xs px-2 py-1 rounded-md transition-colors hover:bg-muted"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          Clear
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {plan.suggestions.map((s, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl border"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-background)" }}>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium"
                style={{ color: "var(--color-muted-foreground)" }}>
                {s.servingsPerWeek}× per week
              </span>
              <p className="text-sm font-medium mt-0.5 truncate"
                style={{ color: "var(--color-foreground)" }}>
                {s.title}
              </p>
              {s.estimatedMacros && (
                <p className="text-xs mt-0.5" style={{ color: "var(--color-muted-foreground)" }}>
                  ~{s.estimatedMacros.calories} kcal · {s.estimatedMacros.protein}g P · {s.estimatedMacros.carbs}g C · {s.estimatedMacros.fat}g F
                </p>
              )}
              {s.recipeId && (
                <p className="text-xs mt-0.5" style={{ color: "#059669" }}>
                  Using saved recipe
                </p>
              )}
            </div>
            {s.recipeId && (
              <Check size={14} className="shrink-0 mt-0.5" style={{ color: "#059669" }} />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onSave}
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-60 hover:opacity-90"
        style={{ backgroundColor: "#059669" }}
      >
        <Plus size={15} />
        {saving ? "Saving…" : "Save Meal Prep"}
      </button>
    </>
  )
}

async function generateRecipe(
  recipeId: string,
  title: string,
  providerId: string,
  modelId: string,
): Promise<void> {
  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: "user",
    content: `Please create a complete recipe for: ${title}`,
    timestamp: Date.now(),
  }

  const res = await fetch("/api/chat/recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [userMessage], providerId, modelId, recipe: null }),
  })

  if (!res.ok || !res.body) return

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let fullText = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    fullText += decoder.decode(value, { stream: true })
  }

  const parsed = extractRecipeJSON(fullText)
  if (!parsed || parsed.type !== "recipe") return

  const assistantMessage: Message = {
    id: crypto.randomUUID(),
    role: "assistant",
    content: fullText,
    timestamp: Date.now(),
  }

  await updateRecipe(recipeId, {
    ...parsed.data,
    conversations: [userMessage, assistantMessage],
    modelId,
    providerId,
  })
}
