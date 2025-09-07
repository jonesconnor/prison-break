"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <div className={cn("border border-primary rounded-full py-4 px-2 flex items-center", className)}>
      <ProgressPrimitive.Root
        data-slot="progress"
        className="bg-primary/20 relative h-4 w-full overflow-hidden rounded-full"
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-primary h-full w-full flex-1 transition-all"
          style={{ 
            transform: `translateX(-${100 - Math.max(value || 0, 1)}%)`,
            minWidth: '1%'
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}

function ProgressCard({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <div className={cn("rounded-full px-1 flex items-center", className)}>
      <ProgressPrimitive.Root
        data-slot="progress"
        className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full"
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-primary h-full w-full flex-1 transition-all"
          style={{ 
            transform: `translateX(-${100 - Math.max(value || 0, 1)}%)`,
            minWidth: '1%'
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}

export { Progress, ProgressCard }
