import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 ease-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "rounded-xl bg-gradient-primary text-primary-foreground shadow-press hover:shadow-ambient hover:brightness-110",
        hero: "rounded-xl bg-gradient-primary text-primary-foreground shadow-ambient hover:brightness-110 hover:-translate-y-0.5",
        secondary: "rounded-xl bg-surface-highest text-primary hover:bg-surface-high",
        tertiary: "rounded-xl bg-transparent text-primary hover:text-primary-container underline-offset-4 hover:underline",
        glass: "rounded-xl glass text-foreground hover:bg-surface-bright",
        teal: "rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-soft",
        slate: "rounded-xl bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 shadow-soft",
        outline: "rounded-xl ghost-border bg-transparent hover:bg-surface-low",
        destructive: "rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost: "rounded-xl hover:bg-surface-low text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
