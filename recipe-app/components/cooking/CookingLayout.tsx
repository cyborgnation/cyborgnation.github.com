"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

interface CookingLayoutProps {
  children: React.ReactNode
  title: string
}

export function CookingLayout({ children, title }: CookingLayoutProps) {
  const router = useRouter()

  function handleExit() {
    router.back()
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleExit()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: "var(--color-background)" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b shrink-0"
        style={{ borderColor: "var(--color-border)" }}>
        <h1 className="text-lg font-semibold truncate" style={{ color: "var(--color-foreground)" }}>
          {title}
        </h1>
        <button
          onClick={handleExit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-muted"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          <X size={15} />
          Exit
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
