"use client"

import { useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRecipe } from "@/lib/hooks/useRecipes"
import { useRecipeChat } from "@/lib/hooks/useRecipeChat"
import { setRecipeConversations } from "@/lib/db/recipes"
import { RecipeArtifact } from "@/components/recipe/RecipeArtifact"
import { ChatPanel } from "@/components/chat/ChatPanel"
import { SaveRecipeButton } from "@/components/recipe/SaveRecipeButton"

interface RecipeDetailClientProps {
  id: string
}

export function RecipeDetailClient({ id }: RecipeDetailClientProps) {
  const recipe = useRecipe(id)

  const {
    messages,
    setMessages,
    isStreaming,
    streamingContent,
    error,
    send,
    abort,
    pendingRecipe,
    clearPendingRecipe,
    providerConfig,
    setProviderConfig,
  } = useRecipeChat({
    recipe: recipe ?? undefined,
    onMessagesChange: async (msgs) => {
      if (recipe) {
        await setRecipeConversations(recipe.id, msgs)
      }
    },
  })

  // Seed chat with stored conversation history
  useEffect(() => {
    if (recipe && recipe.conversations.length > 0 && messages.length === 0) {
      setMessages(recipe.conversations)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe?.id])

  // Auto-generate if this is a stub recipe (created from meal planning but not yet built)
  useEffect(() => {
    if (
      recipe &&
      recipe.ingredients.length === 0 &&
      recipe.steps.length === 0 &&
      recipe.conversations.length === 0
    ) {
      send(`Please create a complete recipe for: ${recipe.title}`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe?.id])

  if (recipe === undefined) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-56px)]">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--color-border)", borderTopColor: "var(--color-primary)" }} />
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] gap-4">
        <p style={{ color: "var(--color-muted-foreground)" }}>Recipe not found.</p>
        <Link href="/" className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
          Back to dashboard
        </Link>
      </div>
    )
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
        <h1 className="text-sm font-semibold truncate" style={{ color: "var(--color-foreground)" }}>
          {recipe.title}
        </h1>
      </div>

      {/* Split pane */}
      <div className="flex-1 flex overflow-hidden">
        {/* Recipe artifact — left */}
        <div className="flex-1 overflow-hidden border-r"
          style={{ borderColor: "var(--color-border)" }}>
          <RecipeArtifact recipe={recipe} />
        </div>

        {/* Chat panel — right */}
        <div className="w-96 shrink-0 flex flex-col overflow-hidden">
          <ChatPanel
            messages={messages}
            isStreaming={isStreaming}
            streamingContent={streamingContent}
            error={error}
            onSend={send}
            onAbort={abort}
            providerConfig={providerConfig}
            onProviderConfigChange={setProviderConfig}
            placeholder="Ask to modify this recipe…"
            className="h-full"
            footer={
              pendingRecipe
                ? (
                  <SaveRecipeButton
                    pendingRecipe={pendingRecipe}
                    existingRecipe={recipe}
                    providerConfig={providerConfig}
                    onDismiss={clearPendingRecipe}
                  />
                )
                : undefined
            }
          />
        </div>
      </div>
    </div>
  )
}
