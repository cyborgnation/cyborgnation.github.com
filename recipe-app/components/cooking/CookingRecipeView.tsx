"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Timer, HelpCircle, List, X } from "lucide-react"
import type { Recipe } from "@/types/recipe"
import { useCookingMode } from "@/lib/hooks/useCookingMode"
import { CookingHelpDrawer } from "./CookingHelpDrawer"

interface CookingRecipeViewProps {
  recipe: Recipe
}

export function CookingRecipeView({ recipe }: CookingRecipeViewProps) {
  const [helpOpen, setHelpOpen] = useState(false)
  const [ingredientsOpen, setIngredientsOpen] = useState(false)

  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    canGoBack,
    canGoForward,
    goNext,
    goPrev,
    checkedIngredients,
    toggleIngredient,
    ingredients,
  } = useCookingMode(recipe.steps, recipe.ingredients)

  return (
    <div className="flex h-full">
      {/* Ingredients sidebar — desktop only */}
      <div className="w-64 shrink-0 border-r overflow-y-auto p-6 hidden lg:block"
        style={{ borderColor: "var(--color-border)" }}>
        <h2 className="text-xs font-semibold uppercase tracking-wide mb-4"
          style={{ color: "var(--color-muted-foreground)" }}>
          Ingredients
        </h2>
        <ul className="space-y-2">
          {ingredients.map((ing, i) => (
            <li key={i} className="flex items-start gap-2">
              <button
                onClick={() => toggleIngredient(i)}
                className="w-4 h-4 rounded mt-0.5 border-2 shrink-0 flex items-center justify-center transition-colors"
                style={checkedIngredients.has(i) ? {
                  backgroundColor: "var(--color-primary)",
                  borderColor: "var(--color-primary)",
                } : {
                  borderColor: "var(--color-border)",
                  backgroundColor: "transparent",
                }}
              >
                {checkedIngredients.has(i) && (
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="white">
                    <path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  </svg>
                )}
              </button>
              <span
                className="text-sm leading-snug transition-colors"
                style={checkedIngredients.has(i)
                  ? { color: "var(--color-muted-foreground)", textDecoration: "line-through" }
                  : { color: "var(--color-foreground)" }}
              >
                <span className="font-medium">{ing.amount} {ing.unit}</span> {ing.name}
                {ing.notes && <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}> ({ing.notes})</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main step area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16 relative">
        {totalSteps === 0 ? (
          <p style={{ color: "var(--color-muted-foreground)" }}>No steps found for this recipe.</p>
        ) : (
          <>
            {/* Progress */}
            <div className="mb-8 text-sm font-medium" style={{ color: "var(--color-muted-foreground)" }}>
              Step {currentStepIndex + 1} of {totalSteps}
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-lg h-1 rounded-full mb-10"
              style={{ backgroundColor: "var(--color-border)" }}>
              <div
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: "var(--color-primary)",
                  width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
                }}
              />
            </div>

            {/* Step content */}
            <div className="max-w-2xl w-full text-center">
              <p className="text-3xl lg:text-4xl leading-relaxed font-medium"
                style={{ color: "var(--color-foreground)" }}>
                {currentStep?.instruction}
              </p>
              {currentStep?.duration && (
                <p className="mt-6 flex items-center justify-center gap-2 text-lg"
                  style={{ color: "var(--color-muted-foreground)" }}>
                  <Timer size={20} />
                  {currentStep.duration} minutes
                </p>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-6 mt-16">
              <button
                onClick={goPrev}
                disabled={!canGoBack}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-medium border transition-all disabled:opacity-30 hover:bg-muted"
                style={{ borderColor: "var(--color-border)", color: "var(--color-foreground)" }}
              >
                <ChevronLeft size={20} />
                Back
              </button>
              <button
                onClick={goNext}
                disabled={!canGoForward}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-medium text-white transition-all disabled:opacity-30 hover:opacity-90"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                {currentStepIndex === totalSteps - 1 ? "Done" : "Next"}
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}

        {/* Mobile: ingredients button */}
        {ingredients.length > 0 && (
          <button
            onClick={() => setIngredientsOpen(true)}
            className="lg:hidden mt-8 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
            style={{ borderColor: "var(--color-border)", color: "var(--color-muted-foreground)" }}
          >
            <List size={15} />
            Ingredients ({checkedIngredients.size}/{ingredients.length} checked)
          </button>
        )}

        {/* Help button */}
        <button
          onClick={() => setHelpOpen(true)}
          className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-white shadow-lg transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <HelpCircle size={16} />
          Help
        </button>
      </div>

      {/* Mobile: ingredients bottom sheet */}
      {ingredientsOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setIngredientsOpen(false)}
        >
          <div
            className="rounded-t-2xl max-h-[70vh] overflow-y-auto p-6"
            style={{ backgroundColor: "var(--color-card)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide"
                style={{ color: "var(--color-muted-foreground)" }}>
                Ingredients
              </h2>
              <button
                onClick={() => setIngredientsOpen(false)}
                className="p-1.5 rounded-lg"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                <X size={16} />
              </button>
            </div>
            <ul className="space-y-3">
              {ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-3">
                  <button
                    onClick={() => toggleIngredient(i)}
                    className="w-5 h-5 rounded mt-0.5 border-2 shrink-0 flex items-center justify-center transition-colors"
                    style={checkedIngredients.has(i) ? {
                      backgroundColor: "var(--color-primary)",
                      borderColor: "var(--color-primary)",
                    } : {
                      borderColor: "var(--color-border)",
                      backgroundColor: "transparent",
                    }}
                  >
                    {checkedIngredients.has(i) && (
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="white">
                        <path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                      </svg>
                    )}
                  </button>
                  <span
                    className="text-sm leading-snug transition-colors"
                    style={checkedIngredients.has(i)
                      ? { color: "var(--color-muted-foreground)", textDecoration: "line-through" }
                      : { color: "var(--color-foreground)" }}
                  >
                    <span className="font-medium">{ing.amount} {ing.unit}</span> {ing.name}
                    {ing.notes && (
                      <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}> ({ing.notes})</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Help drawer */}
      {helpOpen && (
        <CookingHelpDrawer
          recipe={recipe}
          onClose={() => setHelpOpen(false)}
        />
      )}
    </div>
  )
}
