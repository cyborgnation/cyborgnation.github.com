"use client"

import { useEffect, useRef } from "react"
import { ChatMessage, StreamingMessage } from "./ChatMessage"
import { ChatInput } from "./ChatInput"
import { ModelSelector } from "./ModelSelector"
import type { Message } from "@/types/message"
import type { ProviderConfig } from "@/types/ai"

interface ChatPanelProps {
  messages: Message[]
  isStreaming: boolean
  streamingContent: string
  error: string | null
  onSend: (content: string) => void
  onAbort: () => void
  providerConfig: ProviderConfig
  onProviderConfigChange: (config: ProviderConfig) => void
  placeholder?: string
  footer?: React.ReactNode
  className?: string
  disabled?: boolean
}

export function ChatPanel({
  messages,
  isStreaming,
  streamingContent,
  error,
  onSend,
  onAbort,
  providerConfig,
  onProviderConfigChange,
  placeholder,
  footer,
  className,
  disabled,
}: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, streamingContent])

  return (
    <div
      className={`flex flex-col h-full ${className ?? ""}`}
      style={{ backgroundColor: "var(--color-card)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b shrink-0"
        style={{ borderColor: "var(--color-border)" }}>
        <span className="text-xs font-medium" style={{ color: "var(--color-muted-foreground)" }}>
          AI Chat
        </span>
        <ModelSelector value={providerConfig} onChange={onProviderConfigChange} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && !isStreaming && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-center max-w-xs" style={{ color: "var(--color-muted-foreground)" }}>
              Ask anything — for substitutions, scaling, technique tips, or modifications.
            </p>
          </div>
        )}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isStreaming && <StreamingMessage content={streamingContent} />}
        {error && (
          <div className="text-xs px-3 py-2 rounded-lg"
            style={{ backgroundColor: "#FEF2F2", color: "var(--color-destructive)" }}>
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Footer slot (SaveRecipeButton, etc.) */}
      {footer && (
        <div className="px-3 pb-2 shrink-0">
          {footer}
        </div>
      )}

      {/* Input */}
      <div className="shrink-0">
        <ChatInput
          onSend={onSend}
          onAbort={onAbort}
          isStreaming={isStreaming}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
