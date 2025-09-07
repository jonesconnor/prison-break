import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border-[1.5px] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-white text-primary border-primary hover:bg-gray-50 justify-center",
        destructive:
          "bg-destructive text-white border-destructive hover:bg-destructive/90 justify-center",
        outline:
          "bg-background text-primary border-primary hover:bg-gray-50 justify-center",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80 justify-center",
        ghost:
          "border-transparent hover:bg-accent hover:text-accent-foreground justify-center",
        link: 
          "text-primary border-transparent underline-offset-4 hover:underline justify-start w-full text-left",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
