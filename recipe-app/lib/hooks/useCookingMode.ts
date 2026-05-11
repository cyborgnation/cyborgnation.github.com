"use client"

import { useState, useCallback } from "react"
import type { RecipeStep, Ingredient } from "@/types/recipe"

export function useCookingMode(steps: RecipeStep[], ingredients: Ingredient[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set())

  const sortedSteps = [...steps].sort((a, b) => a.order - b.order)

  const canGoBack = currentStepIndex > 0
  const canGoForward = currentStepIndex < sortedSteps.length - 1

  const goNext = useCallback(() => {
    setCurrentStepIndex((i) => Math.min(i + 1, sortedSteps.length - 1))
  }, [sortedSteps.length])

  const goPrev = useCallback(() => {
    setCurrentStepIndex((i) => Math.max(i - 1, 0))
  }, [])

  const toggleIngredient = useCallback((index: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setCurrentStepIndex(0)
    setCheckedIngredients(new Set())
  }, [])

  return {
    currentStep: sortedSteps[currentStepIndex] ?? null,
    currentStepIndex,
    totalSteps: sortedSteps.length,
    sortedSteps,
    canGoBack,
    canGoForward,
    goNext,
    goPrev,
    checkedIngredients,
    toggleIngredient,
    reset,
    ingredients,
  }
}
