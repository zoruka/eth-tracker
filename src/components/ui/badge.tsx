import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'destructive';
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, color = 'default', className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={badgeVariants({ className, color })}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';

const badgeVariants = cva(
  'inline-flex gap-2 py-1 px-2 rounded items-center h-fit w-fit',
  {
    variants: {
      color: {
        default: 'bg-foreground/30 text-foreground',
        primary: 'bg-primary/30 text-primary',
        secondary: 'bg-secondary/30 text-secondary',
        success: 'bg-success/30 text-success',
        destructive: 'bg-destructive/30 text-destructive',
      },
    },
  }
);
