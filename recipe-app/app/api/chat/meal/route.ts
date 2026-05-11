import { getProvider } from "@/lib/ai/registry"
import { buildMealPlanningPrompt } from "@/lib/ai/prompts/meal-planning"
import type { Message } from "@/types/message"
import type { ExistingRecipeSummary } from "@/lib/ai/prompts/meal-planning"

export const runtime = "nodejs"

const MAX_CONTEXT_MESSAGES = 20

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      messages: Message[]
      providerId: string
      modelId: string
      existingRecipes?: ExistingRecipeSummary[]
    }

    const { messages, providerId, modelId, existingRecipes = [] } = body

    if (!messages || !providerId || !modelId) {
      return new Response("Missing required fields", { status: 400 })
    }

    const provider = getProvider(providerId)
    const systemPrompt = buildMealPlanningPrompt(existingRecipes)
    const contextMessages = messages.slice(-MAX_CONTEXT_MESSAGES)

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of provider.chat(contextMessages, systemPrompt, modelId)) {
            controller.enqueue(encoder.encode(chunk))
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Unknown error"
          controller.enqueue(encoder.encode(`\n\n[Error: ${msg}]`))
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Content-Type-Options": "nosniff",
      },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    return new Response(msg, { status: 500 })
  }
}
