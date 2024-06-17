import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof inputVariants> & {
    left?: React.ReactNode;
    right?: React.ReactNode;
    textarea?: boolean;
  };

export const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(({ className, type, left, right, textarea, ...props }, ref) => {
  const Comp = textarea ? 'textarea' : 'input';

  return (
    <div
      className={cn(
        inputVariants({
          className,
        })
      )}
    >
      {left}
      <Comp
        type={type}
        className="w-full h-full bg-transparent text-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-transparent focus:ring-offset-transparent focus:ring-transparent focus-visible:ring-transparent focus-visible:ring-offset"
        ref={ref as any}
        {...props}
      />
      {right}
    </div>
  );
});
Input.displayName = 'Input';

const inputVariants = cva(
  'group flex items-center min-h-10 w-full rounded-md border border-input bg-foreground/5 px-3 py-2 gap-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:border-ring focus-within:outline-none focus-within:ring-2 focus-within:ring focus-within:ring-offset-2 focus-within:text-ring disabled:cursor-not-allowed disabled:opacity-50 transition'
);
