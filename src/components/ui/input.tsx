import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg bg-surface-low px-4 py-2 text-base ring-offset-background transition-all duration-200 ease-editorial file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-on-surface-muted focus-visible:outline-none focus-visible:bg-surface-lowest focus-visible:ghost-border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-0",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
