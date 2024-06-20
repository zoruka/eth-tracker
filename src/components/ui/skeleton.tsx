import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

export const Skeleton = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={skeletonVariants({ className })} {...props} />
  );
});
Skeleton.displayName = 'Skeleton';

const skeletonVariants = cva('animate-pulse bg-foreground/10 rounded');
