import { type LucideIcon } from "lucide-react"
import Link from "next/link"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: "var(--color-accent)", color: "var(--color-primary)" }}>
        <Icon size={28} />
      </div>
      <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--color-foreground)" }}>
        {title}
      </h3>
      <p className="text-sm max-w-xs mb-6" style={{ color: "var(--color-muted-foreground)" }}>
        {description}
      </p>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}
