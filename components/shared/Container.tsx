import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export default function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full min-w-0 max-w-290 px-4.5", className)} {...props} />
}
