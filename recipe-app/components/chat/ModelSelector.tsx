"use client"

import { getAllProviders } from "@/lib/ai/registry"
import type { ProviderConfig } from "@/types/ai"

interface ModelSelectorProps {
  value: ProviderConfig
  onChange: (config: ProviderConfig) => void
  className?: string
}

export function ModelSelector({ value, onChange, className }: ModelSelectorProps) {
  const providers = getAllProviders()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const [providerId, modelId] = e.target.value.split("::")
    onChange({ providerId, modelId })
    localStorage.setItem("preferred-model", e.target.value)
  }

  const selectValue = `${value.providerId}::${value.modelId}`

  return (
    <select
      value={selectValue}
      onChange={handleChange}
      className={className}
      style={{
        border: `1px solid var(--color-border)`,
        borderRadius: "var(--radius-sm)",
        backgroundColor: "var(--color-background)",
        color: "var(--color-muted-foreground)",
        fontSize: "0.75rem",
        padding: "0.25rem 0.5rem",
        outline: "none",
        cursor: "pointer",
      }}
    >
      {providers.map((provider) =>
        provider.models.map((model) => (
          <option key={`${provider.id}::${model.id}`} value={`${provider.id}::${model.id}`}>
            {provider.name} / {model.name}
          </option>
        ))
      )}
    </select>
  )
}
