'use client';

import { cva } from 'class-variance-authority';
import { useEffect, useRef, useState } from 'react';
import { Button } from './button';
import { Icon } from '../icon';

export type CollapsibleProps = React.PropsWithChildren<{
  trigger: React.ReactNode;
  initialOpen?: boolean;
}>;

export const Collapsible: React.FC<CollapsibleProps> = ({
  trigger,
  children,
  initialOpen = false,
}) => {
  const [open, setOpen] = useState(initialOpen);
  const collapserRef = useRef<HTMLDivElement>(null);

  const handleTriggerClick = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (collapserRef.current) {
      if (open) {
        const height = collapserRef.current.scrollHeight;
        collapserRef.current.style.height = '0px';
        collapserRef.current.style.height = `${height}px`;

        const resizeListener = () => {
          if (collapserRef.current) {
            collapserRef.current.style.height = 'auto';
            collapserRef.current.style.height = `${collapserRef.current.scrollHeight}px`;
          }
        };

        window.addEventListener('resize', resizeListener);
        return () => {
          window.removeEventListener('resize', resizeListener);
        };
      }

      collapserRef.current.style.height = `0px`;
    }
  }, [open]);

  return (
    <div>
      <Button
        className={triggerVariants({ open })}
        onClick={handleTriggerClick}
        variant="outline"
      >
        {trigger}
        <Icon name="chevron-down" className={indicatorVariants({ open })} />
      </Button>
      <div ref={collapserRef} className={collapserVariants({ open })}>
        {children}
      </div>
    </div>
  );
};

const triggerVariants = cva(
  'flex items-center justify-center p-2 rounded w-full',
  {
    variants: {
      open: {
        true: 'rounded-b-none',
      },
    },
  }
);

const collapserVariants = cva(
  'w-full overflow-hidden border border-t-0 rounded-b transition-all',
  {
    variants: {
      open: {
        true: 'opacity-100 h-auto',
        false: 'opacity-0 h-0',
      },
    },
  }
);

const indicatorVariants = cva('transition', {
  variants: {
    open: {
      true: 'transform rotate-180',
    },
  },
});
