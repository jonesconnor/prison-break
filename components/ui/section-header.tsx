import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  children: React.ReactNode
  className?: string
}

export function SectionHeader({ children, className }: SectionHeaderProps) {
  return (
    <div className={cn("w-full", className)}>
      <h2 className="text-4xl font-bold text-primary mb-4">
        {children}
      </h2>
      <div className="border-b border-primary w-full" />
    </div>
  )
}
