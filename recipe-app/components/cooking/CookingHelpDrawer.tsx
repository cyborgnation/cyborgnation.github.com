"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"
import { ChatPanel } from "@/components/chat/ChatPanel"
import { useRecipeChat } from "@/lib/hooks/useRecipeChat"
import type { Recipe } from "@/types/recipe"

interface CookingHelpDrawerProps {
  recipe: Recipe
  onClose: () => void
}

export function CookingHelpDrawer({ recipe, onClose }: CookingHelpDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)

  const { messages, isStreaming, streamingContent, error, send, abort, providerConfig, setProviderConfig } =
    useRecipeChat({ recipe })

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-60 flex justify-end" onClick={onClose}>
      <div
        ref={drawerRef}
        className="w-full max-w-md h-full flex flex-col shadow-2xl"
        style={{ backgroundColor: "var(--color-card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b shrink-0"
          style={{ borderColor: "var(--color-border)" }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
              Cooking Help
            </p>
            <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
              Ask about substitutions, technique, or timing
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg transition-colors hover:bg-muted"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            <X size={16} />
          </button>
        </div>

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
            placeholder="Ask about this recipe..."
            className="h-full"
          />
        </div>
      </div>
    </div>
  )
}
