import Anthropic from "@anthropic-ai/sdk"
import type { AIProvider, AIModel } from "@/types/ai"
import type { Message } from "@/types/message"

export class AnthropicProvider implements AIProvider {
  id = "anthropic"
  name = "Anthropic"
  models: AIModel[] = [
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", contextWindow: 200000 },
    { id: "claude-opus-4-5-20251101", name: "Claude Opus 4.5", contextWindow: 200000 },
    { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5", contextWindow: 200000 },
  ]

  async *chat(
    messages: Message[],
    systemPrompt: string,
    model: string
  ): AsyncGenerator<string, void, unknown> {
    const client = new Anthropic()
    const stream = client.messages.stream({
      model,
      max_tokens: 4096,
      system: systemPrompt,
      messages: messages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    })
    for await (const chunk of stream) {
      if (
        chunk.type === "content_block_delta" &&
        chunk.delta.type === "text_delta"
      ) {
        yield chunk.delta.text
      }
    }
  }
}
