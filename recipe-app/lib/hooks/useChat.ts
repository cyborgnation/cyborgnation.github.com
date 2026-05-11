"use client"

import { useState, useRef, useCallback } from "react"
import type { Message } from "@/types/message"

interface UseChatOptions {
  endpoint: string
  onComplete?: (fullText: string, messages: Message[]) => void
  buildExtraBody?: () => object
}

export interface UseChatReturn {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  send: (content: string) => Promise<void>
  abort: () => void
  isStreaming: boolean
  streamingContent: string
  error: string | null
}

export function useChat({ endpoint, onComplete, buildExtraBody }: UseChatOptions): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingContent, setStreamingContent] = useState("")
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Refs so send() always calls the latest versions without being recreated on every render
  const buildExtraBodyRef = useRef(buildExtraBody)
  buildExtraBodyRef.current = buildExtraBody
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const send = useCallback(
    async (content: string) => {
      if (isStreaming) return

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        timestamp: Date.now(),
      }

      const updatedMessages = [...messages, userMessage]
      setMessages(updatedMessages)
      setIsStreaming(true)
      setStreamingContent("")
      setError(null)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const extraBody = buildExtraBodyRef.current ? buildExtraBodyRef.current() : {}
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages, ...extraBody }),
          signal: controller.signal,
        })

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`)
        }

        const reader = res.body!.getReader()
        const decoder = new TextDecoder()
        let fullText = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          fullText += chunk
          setStreamingContent(fullText)
        }

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: fullText,
          timestamp: Date.now(),
        }

        const finalMessages = [...updatedMessages, assistantMessage]
        setMessages(finalMessages)
        setStreamingContent("")
        onCompleteRef.current?.(fullText, finalMessages)
      } catch (err) {
        if ((err as Error).name === "AbortError") return
        const msg = err instanceof Error ? err.message : "Unknown error"
        setError(msg)
      } finally {
        setIsStreaming(false)
        setStreamingContent("")
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages, isStreaming, endpoint]
  )

  const abort = useCallback(() => {
    abortRef.current?.abort()
    setIsStreaming(false)
    setStreamingContent("")
  }, [])

  return { messages, setMessages, send, abort, isStreaming, streamingContent, error }
}
