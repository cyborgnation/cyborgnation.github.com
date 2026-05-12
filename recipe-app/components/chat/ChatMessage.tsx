"use client"

import { cn } from "@/lib/utils/cn"
import type { Message } from "@/types/message"

interface ChatMessageProps {
  message: Message
}

function renderContent(content: string) {
  // Strip complete JSON blocks — they're shown as UI (SaveRecipeButton, meal plan card)
  const stripped = content.replace(/```json[\s\S]*?```/g, "").trim()
  if (!stripped) return null

  // Simple markdown: bold, inline code, line breaks
  const lines = stripped.split("\n")
  return lines.map((line, i) => {
    if (line === "") return <br key={i} />
    const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
    return (
      <p key={i} className="leading-relaxed">
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j}>{part.slice(2, -2)}</strong>
          }
          if (part.startsWith("`") && part.endsWith("`")) {
            return (
              <code key={j} className="px-1 py-0.5 rounded text-xs font-mono"
                style={{ background: "var(--color-muted)", color: "var(--color-foreground)" }}>
                {part.slice(1, -1)}
              </code>
            )
          }
          return part
        })}
      </p>
    )
  })
}

// Detect whether content has an open (not-yet-closed) JSON block mid-stream.
// Returns the text before the block and a label for what's being generated.
function splitStreamingContent(content: string): {
  text: string
  isGenerating: boolean
  generatingLabel: string
} {
  // Remove any complete JSON blocks first
  const withoutComplete = content.replace(/```json[\s\S]*?```/g, "")

  // Check for an open block (```json without a matching closing ```)
  const openIdx = withoutComplete.lastIndexOf("```json")
  if (openIdx === -1) {
    return { text: withoutComplete.trim(), isGenerating: false, generatingLabel: "" }
  }

  const before = withoutComplete.slice(0, openIdx).trim()
  const partialJson = withoutComplete.slice(openIdx)

  // Peek at __type to pick a friendly label
  const typeMatch = partialJson.match(/"__type"\s*:\s*"([^"]+)"/)
  const type = typeMatch?.[1] ?? ""
  const label =
    type === "recipe" ? "Building recipe…"
    : type === "recipe_update" ? "Updating recipe…"
    : type === "meal_plan" ? "Building meal plan…"
    : type === "meal_prep_plan" ? "Building meal prep plan…"
    : "Generating…"

  return { text: before, isGenerating: true, generatingLabel: label }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm space-y-1",
          isUser ? "rounded-tr-sm" : "rounded-tl-sm"
        )}
        style={isUser ? {
          backgroundColor: "var(--color-primary)",
          color: "var(--color-primary-foreground)",
        } : {
          backgroundColor: "var(--color-muted)",
          color: "var(--color-foreground)",
        }}
      >
        {renderContent(message.content)}
      </div>
    </div>
  )
}

function GeneratingCard({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl mt-1.5"
      style={{ backgroundColor: "var(--color-accent)", border: "1px solid var(--color-border)" }}>
      <span className="inline-flex gap-1 items-center shrink-0">
        <span className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{ backgroundColor: "var(--color-primary)", animationDelay: "0ms" }} />
        <span className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{ backgroundColor: "var(--color-primary)", animationDelay: "150ms" }} />
        <span className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{ backgroundColor: "var(--color-primary)", animationDelay: "300ms" }} />
      </span>
      <span className="text-xs font-medium" style={{ color: "var(--color-primary)" }}>
        {label}
      </span>
    </div>
  )
}

interface StreamingMessageProps {
  content: string
}

export function StreamingMessage({ content }: StreamingMessageProps) {
  const { text, isGenerating, generatingLabel } = splitStreamingContent(content)

  const hasText = text.length > 0

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] space-y-1">
        {/* Conversational text */}
        {(hasText || !isGenerating) && (
          <div
            className="rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm"
            style={{ backgroundColor: "var(--color-muted)", color: "var(--color-foreground)" }}
          >
            {hasText ? (
              <span className={cn(!isGenerating && "streaming-cursor")}>{text}</span>
            ) : (
              <span className="inline-flex gap-1 items-center py-1">
                <span className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{ backgroundColor: "var(--color-muted-foreground)", animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{ backgroundColor: "var(--color-muted-foreground)", animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{ backgroundColor: "var(--color-muted-foreground)", animationDelay: "300ms" }} />
              </span>
            )}
          </div>
        )}

        {/* Generating card — replaces raw JSON during streaming */}
        {isGenerating && <GeneratingCard label={generatingLabel} />}
      </div>
    </div>
  )
}
