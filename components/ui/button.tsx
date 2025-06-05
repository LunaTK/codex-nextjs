import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "border px-4 py-1 rounded transition-colors hover:bg-accent hover:text-accent-foreground",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
