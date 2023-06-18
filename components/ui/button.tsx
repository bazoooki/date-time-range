import * as React from 'react'
import {VariantProps, cva} from 'class-variance-authority'
import {cn} from '@/lib/utils'
import {clsx} from "clsx";

const buttonVariants = cva(
  clsx("inline-flex items-center justify-center rounded-md text-sm  transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none ring-offset-background"),
  {
    variants: {
      variant: {
        default: "bg-teal-600 text-slate-100 hover:bg-teal-600/90",
        outline: "border border-input  hover:text-teal-600",
        ghost: "hover:bg-accent hover:text-teal-800",
      },
      size: {
        default: "h-10 py-2 px-4",
        xs: "h-7 px-3 rounded-md text-xs",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md text-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, children, variant, size, ...props}, ref) => {
    return (
      <button
        className={cn(buttonVariants({variant, size, className}))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export {Button, buttonVariants}