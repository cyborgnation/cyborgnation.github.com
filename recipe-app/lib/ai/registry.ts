import type { AIProvider } from "@/types/ai"
import { AnthropicProvider } from "./providers/anthropic"
import { OpenAIProvider } from "./providers/openai"

const providers: Record<string, AIProvider> = {
  anthropic: new AnthropicProvider(),
  openai: new OpenAIProvider(),
}

export function getProvider(id: string): AIProvider {
  const p = providers[id]
  if (!p) throw new Error(`Unknown AI provider: ${id}`)
  return p
}

export function getAllProviders(): AIProvider[] {
  return Object.values(providers)
}
