'use client';

import { cva } from 'class-variance-authority';
import { useEffect, useRef, useState } from 'react';
import { Button } from './button';

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
      } else {
        collapserRef.current.style.height = `0px`;
      }
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
        true: 'opacity-100',
        false: 'opacity-0',
      },
    },
  }
);
