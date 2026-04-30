import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[96px] w-full rounded-lg bg-surface-low px-4 py-3 text-sm ring-offset-background transition-all duration-200 ease-editorial placeholder:text-on-surface-muted focus-visible:outline-none focus-visible:bg-surface-lowest focus-visible:ghost-border-primary disabled:cursor-not-allowed disabled:opacity-50 border-0 resize-none",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
