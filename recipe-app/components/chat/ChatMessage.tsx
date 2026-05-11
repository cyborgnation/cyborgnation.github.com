"use client"

import { cn } from "@/lib/utils/cn"
import type { Message } from "@/types/message"

interface ChatMessageProps {
  message: Message
}

function renderContent(content: string) {
  // Strip JSON code blocks from display — they get shown via SaveRecipeButton instead
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

interface StreamingMessageProps {
  content: string
}

export function StreamingMessage({ content }: StreamingMessageProps) {
  const stripped = content.replace(/```json[\s\S]*?```/g, "").trim()
  return (
    <div className="flex justify-start">
      <div
        className="max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm"
        style={{ backgroundColor: "var(--color-muted)", color: "var(--color-foreground)" }}
      >
        {stripped ? (
          <span className="streaming-cursor">{stripped}</span>
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
    </div>
  )
}
