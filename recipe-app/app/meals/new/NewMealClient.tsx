"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Plus, Check, Utensils, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChatPanel } from "@/components/chat/ChatPanel"
import { useMealChat, type ParsedMealPlan } from "@/lib/hooks/useMealChat"
import { useRecipes } from "@/lib/hooks/useRecipes"
import { createMeal } from "@/lib/db/meals"
import { createRecipe, updateRecipe } from "@/lib/db/recipes"
import { extractRecipeJSON } from "@/lib/utils/recipe-parser"
import { toast } from "sonner"
import type { RecipeRole } from "@/types/meal"
import type { Message } from "@/types/message"

export function NewMealClient() {
  const router = useRouter()
  const recipes = useRecipes()
  const [saving, setSaving] = useState(false)
  const [savedMealPlan, setSavedMealPlan] = useState<ParsedMealPlan | null>(null)
  const [showPlanSheet, setShowPlanSheet] = useState(false)

  const existingRecipes = (recipes ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    tags: r.tags,
    servings: r.servings,
  }))

  const {
    messages,
    isStreaming,
    streamingContent,
    error,
    send,
    abort,
    pendingMealPlan,
    clearPendingMealPlan,
    providerConfig,
    setProviderConfig,
  } = useMealChat({ existingRecipes })

  useEffect(() => {
    const stored = localStorage.getItem("preferred-model")
    if (stored) {
      const [providerId, modelId] = stored.split("::")
      if (providerId && modelId) setProviderConfig({ providerId, modelId })
    }
  }, [setProviderConfig])

  const activePlan = savedMealPlan ?? pendingMealPlan

  async function handleSaveMeal() {
    if (!activePlan) return
    setSaving(true)
    try {
      const newStubs: Array<{ recipeId: string; title: string }> = []

      const resolvedRefs = await Promise.all(
        activePlan.suggestions.map(async (s) => {
          if (s.recipeId) {
            return { recipeId: s.recipeId, role: s.role as RecipeRole }
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
          return { recipeId: stub.id, role: s.role as RecipeRole }
        })
      )

      const meal = await createMeal({
        title: activePlan.title,
        description: activePlan.description,
        recipeRefs: resolvedRefs,
        conversations: messages,
        modelId: providerConfig.modelId,
        providerId: providerConfig.providerId,
      })

      // Kick off background generation for all new recipes — don't await
      for (const { recipeId, title } of newStubs) {
        generateRecipe(recipeId, title, providerConfig.providerId, providerConfig.modelId)
          .catch(() => {}) // stub stays if generation fails; recipe page will retry
      }

      toast.success(`Meal saved! Generating ${newStubs.length} recipe${newStubs.length !== 1 ? "s" : ""} in the background…`)
      router.push(`/meals/${meal.id}`)
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
        <Link href="/meals" className="p-1.5 rounded-lg transition-colors hover:bg-muted"
          style={{ color: "var(--color-muted-foreground)" }}>
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
            New Meal
          </h1>
          <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
            Describe the occasion and AI will help you compose a complete meal.
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
            placeholder="Describe the occasion, dietary needs, and how many guests…"
            className="h-full"
          />
        </div>

        {/* Meal plan preview — desktop sidebar */}
        {activePlan && (
          <div className="hidden md:flex md:flex-col w-80 shrink-0 border-l overflow-y-auto p-4"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
            <PlanContent
              plan={activePlan}
              saving={saving}
              onClear={clearPendingMealPlan}
              onSave={handleSaveMeal}
            />
          </div>
        )}
      </div>

      {/* Mobile: floating "View Plan" button */}
      {activePlan && (
        <button
          onClick={() => setShowPlanSheet(true)}
          className="md:hidden fixed bottom-20 right-4 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg z-30 transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #EA580C 0%, #DC2626 100%)" }}
        >
          <Utensils size={15} />
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
                Meal Plan
              </span>
              <button
                onClick={() => setShowPlanSheet(false)}
                className="p-1.5 rounded-lg"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                <X size={16} />
              </button>
            </div>
            <PlanContent
              plan={activePlan}
              saving={saving}
              onClear={() => { clearPendingMealPlan(); setShowPlanSheet(false) }}
              onSave={handleSaveMeal}
            />
          </div>
        </div>
      )}
    </div>
  )
}

interface PlanContentProps {
  plan: ParsedMealPlan
  saving: boolean
  onClear: () => void
  onSave: () => void
}

function PlanContent({ plan, saving, onClear, onSave }: PlanContentProps) {
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
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-background)" }}>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium capitalize"
                style={{ color: "var(--color-muted-foreground)" }}>
                {s.role}
              </span>
              <p className="text-sm font-medium mt-0.5 truncate"
                style={{ color: "var(--color-foreground)" }}>
                {s.title}
              </p>
              {s.recipeId && (
                <p className="text-xs mt-0.5" style={{ color: "var(--color-primary)" }}>
                  Using saved recipe
                </p>
              )}
              {s.isNew && (
                <p className="text-xs mt-0.5" style={{ color: "var(--color-muted-foreground)" }}>
                  Will be generated when you open it
                </p>
              )}
            </div>
            {s.recipeId && (
              <Check size={14} className="shrink-0" style={{ color: "var(--color-primary)" }} />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onSave}
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-60 hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #EA580C 0%, #DC2626 100%)" }}
      >
        <Plus size={15} />
        {saving ? "Saving…" : "Save Meal"}
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
