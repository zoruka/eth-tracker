import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils/cn';

import { icons } from './icons';

export type IconName = keyof typeof icons;

export type IconProps = VariantProps<typeof iconVariants> &
  React.SVGProps<SVGSVGElement> & {
    name: IconName;
  };

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, className, size, ...props }, ref) => {
    const Comp = icons[name];

    return (
      <Comp
        ref={ref}
        className={cn(iconVariants({ className, size }))}
        {...props}
      />
    );
  }
);
Icon.displayName = 'Icon';

const iconVariants = cva('inline shrink-0', {
  variants: {
    size: {
      default: 'w-[1em] h-[1em]',
      sm: 'w-5 h-5',
      lg: 'w-7 h-7',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
