"use client"

import { useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ChatPanel } from "@/components/chat/ChatPanel"
import { SaveRecipeButton } from "@/components/recipe/SaveRecipeButton"
import { useRecipeChat } from "@/lib/hooks/useRecipeChat"

export function NewRecipeClient() {
  const {
    messages,
    isStreaming,
    streamingContent,
    error,
    send,
    abort,
    pendingRecipe,
    clearPendingRecipe,
    providerConfig,
    setProviderConfig,
  } = useRecipeChat()

  // Restore preferred model from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("preferred-model")
    if (stored) {
      const [providerId, modelId] = stored.split("::")
      if (providerId && modelId) {
        setProviderConfig({ providerId, modelId })
      }
    }
  }, [setProviderConfig])

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
            New Recipe
          </h1>
          <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
            Chat with AI to create a recipe — it becomes a saved artifact you can modify anytime.
          </p>
        </div>
      </div>

      {/* Chat area — full height */}
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
          placeholder="Tell me what you'd like to cook…"
          className="h-full"
          footer={
            pendingRecipe
              ? (
                <SaveRecipeButton
                  pendingRecipe={pendingRecipe}
                  providerConfig={providerConfig}
                  onDismiss={clearPendingRecipe}
                />
              )
              : undefined
          }
        />
      </div>
    </div>
  )
}
