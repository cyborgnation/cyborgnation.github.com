import type { AIProvider, AIModel } from "@/types/ai"
import type { Message } from "@/types/message"

export class OpenAIProvider implements AIProvider {
  id = "openai"
  name = "OpenAI"
  models: AIModel[] = [
    { id: "gpt-4o", name: "GPT-4o", contextWindow: 128000 },
    { id: "gpt-4o-mini", name: "GPT-4o Mini", contextWindow: 128000 },
  ]

  // eslint-disable-next-line require-yield
  async *chat(
    _messages: Message[],
    _systemPrompt: string,
    _model: string
  ): AsyncGenerator<string, void, unknown> {
    throw new Error(
      "OpenAI provider not yet configured. Set OPENAI_API_KEY and implement this provider."
    )
  }
}
