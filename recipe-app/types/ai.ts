import type { Message } from "./message"

export interface AIModel {
  id: string
  name: string
  contextWindow?: number
}

export interface AIProvider {
  id: string
  name: string
  models: AIModel[]
  chat(
    messages: Message[],
    systemPrompt: string,
    model: string
  ): AsyncGenerator<string, void, unknown>
}

export interface ProviderConfig {
  providerId: string
  modelId: string
}

export const DEFAULT_PROVIDER_CONFIG: ProviderConfig = {
  providerId: "anthropic",
  modelId: "claude-sonnet-4-6",
}
