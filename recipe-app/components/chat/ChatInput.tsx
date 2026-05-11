"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Square } from "lucide-react"

interface ChatInputProps {
  onSend: (content: string) => void
  onAbort: () => void
  isStreaming: boolean
  placeholder?: string
  disabled?: boolean
}

export function ChatInput({ onSend, onAbort, isStreaming, placeholder, disabled }: ChatInputProps) {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }, [value])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleSend() {
    const trimmed = value.trim()
    if (!trimmed || isStreaming || disabled) return
    onSend(trimmed)
    setValue("")
  }

  return (
    <div className="flex items-end gap-2 p-3 border-t"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? "Message..."}
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none rounded-xl px-3 py-2 text-sm outline-none transition-colors min-h-[40px] max-h-[200px]"
        style={{
          border: `1px solid var(--color-border)`,
          backgroundColor: "var(--color-background)",
          color: "var(--color-foreground)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--color-primary)"
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--color-border)"
        }}
      />
      {isStreaming ? (
        <button
          onClick={onAbort}
          className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-opacity hover:opacity-80"
          style={{ backgroundColor: "var(--color-destructive)", color: "white" }}
          title="Stop"
        >
          <Square size={14} />
        </button>
      ) : (
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-opacity disabled:opacity-40 hover:opacity-80"
          style={{ backgroundColor: "var(--color-primary)", color: "white" }}
          title="Send"
        >
          <Send size={14} />
        </button>
      )}
    </div>
  )
}
