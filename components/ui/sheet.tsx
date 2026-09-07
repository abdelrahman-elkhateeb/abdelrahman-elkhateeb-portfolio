"use client"
import type { ComponentProps } from "react"
import { Dialog } from "radix-ui"
import { cn } from "@/lib/utils"

const Sheet = Dialog.Root
const SheetTrigger = Dialog.Trigger
const SheetClose = Dialog.Close
const SheetTitle = Dialog.Title

function SheetContent({ className, children, ...props }: ComponentProps<typeof Dialog.Content>) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="nx-menu-ground fixed inset-0 z-[60] bg-background" />
      <Dialog.Content data-slot="sheet-content" className={cn("nx-menu-ground fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-background", className)} {...props}>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}
export { Sheet, SheetTrigger, SheetClose, SheetTitle, SheetContent }
