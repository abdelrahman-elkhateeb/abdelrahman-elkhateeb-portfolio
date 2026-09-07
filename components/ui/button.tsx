import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg no-underline disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        outline: "nx-hero-btn-primary text-[15px] font-medium tracking-[0.02em]",
        icon: "nx-icon-btn",
      },
      size: { default: "h-12 px-6", icon: "size-12", touch: "size-11" },
    },
    defaultVariants: { variant: "outline", size: "default" },
  },
)

function Button({ className, variant, size, asChild = false, ...props }:
  React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
export { Button, buttonVariants }
