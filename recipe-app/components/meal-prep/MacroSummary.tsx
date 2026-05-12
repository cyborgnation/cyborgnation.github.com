"use client"

interface MacroEntry {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  servingsPerWeek: number
}

interface MacroSummaryProps {
  entries: MacroEntry[]
}

function calcTotals(entries: MacroEntry[]) {
  return entries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories * e.servingsPerWeek,
      protein: acc.protein + e.protein * e.servingsPerWeek,
      carbs: acc.carbs + e.carbs * e.servingsPerWeek,
      fat: acc.fat + e.fat * e.servingsPerWeek,
      fiber: acc.fiber + (e.fiber ?? 0) * e.servingsPerWeek,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  )
}

export function MacroSummary({ entries }: MacroSummaryProps) {
  if (entries.length === 0) return null

  const weekly = calcTotals(entries)
  const daily = {
    calories: Math.round(weekly.calories / 7),
    protein: Math.round(weekly.protein / 7),
    carbs: Math.round(weekly.carbs / 7),
    fat: Math.round(weekly.fat / 7),
    fiber: Math.round(weekly.fiber / 7),
  }

  const proteinCals = weekly.protein * 4
  const carbsCals = weekly.carbs * 4
  const fatCals = weekly.fat * 9
  const totalMacroCals = proteinCals + carbsCals + fatCals || 1
  const proteinPct = Math.round((proteinCals / totalMacroCals) * 100)
  const carbsPct = Math.round((carbsCals / totalMacroCals) * 100)
  const fatPct = 100 - proteinPct - carbsPct

  const tiles = [
    { label: "Calories", value: daily.calories.toLocaleString(), unit: "kcal/day", accent: "#6366F1" },
    { label: "Protein", value: daily.protein, unit: "g/day", accent: "#059669" },
    { label: "Carbs", value: daily.carbs, unit: "g/day", accent: "#D97706" },
    { label: "Fat", value: daily.fat, unit: "g/day", accent: "#DC2626" },
  ]

  return (
    <div className="rounded-2xl border p-4"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
      <h3 className="text-xs font-semibold uppercase tracking-wide mb-3"
        style={{ color: "var(--color-muted-foreground)" }}>
        Daily Averages
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-xl p-3"
            style={{ backgroundColor: "var(--color-background)" }}>
            <p className="text-xs mb-1" style={{ color: "var(--color-muted-foreground)" }}>{t.label}</p>
            <p className="text-lg font-bold" style={{ color: t.accent }}>{t.value}</p>
            <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>{t.unit}</p>
          </div>
        ))}
      </div>

      {/* P / C / F ratio bar */}
      <div className="mb-2">
        <p className="text-xs mb-1.5" style={{ color: "var(--color-muted-foreground)" }}>
          Macro ratio &nbsp;
          <span style={{ color: "#059669" }}>P {proteinPct}%</span>
          {" · "}
          <span style={{ color: "#D97706" }}>C {carbsPct}%</span>
          {" · "}
          <span style={{ color: "#DC2626" }}>F {fatPct}%</span>
        </p>
        <div className="flex rounded-full overflow-hidden h-2">
          <div style={{ width: `${proteinPct}%`, backgroundColor: "#059669" }} />
          <div style={{ width: `${carbsPct}%`, backgroundColor: "#D97706" }} />
          <div style={{ width: `${fatPct}%`, backgroundColor: "#DC2626" }} />
        </div>
      </div>

      {/* Weekly totals footer */}
      <div className="pt-3 mt-3 border-t flex flex-wrap gap-x-4 gap-y-1"
        style={{ borderColor: "var(--color-border)" }}>
        <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
          Weekly: <strong style={{ color: "var(--color-foreground)" }}>{weekly.calories.toLocaleString()} kcal</strong>
        </span>
        <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
          <strong style={{ color: "var(--color-foreground)" }}>{Math.round(weekly.protein)}g</strong> protein
        </span>
        <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
          <strong style={{ color: "var(--color-foreground)" }}>{Math.round(weekly.carbs)}g</strong> carbs
        </span>
        <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
          <strong style={{ color: "var(--color-foreground)" }}>{Math.round(weekly.fat)}g</strong> fat
        </span>
        {weekly.fiber > 0 && (
          <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
            <strong style={{ color: "var(--color-foreground)" }}>{Math.round(weekly.fiber)}g</strong> fiber
          </span>
        )}
      </div>
    </div>
  )
}
