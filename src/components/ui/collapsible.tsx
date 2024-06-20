'use client';

import { cva } from 'class-variance-authority';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Button, ButtonProps } from './button';
import { Icon } from '../icon';
import { createContext } from '@/lib/client/create-context';

export type CollapsibleProps = React.HTMLAttributes<HTMLDivElement> & {
  initialOpen?: boolean;
};

export const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  initialOpen = false,
  ...props
}) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <CollapsibleProvider value={{ open, setOpen }}>
      <div {...props}>{children}</div>
    </CollapsibleProvider>
  );
};

export type CollapsibleTriggerProps = ButtonProps;

export const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({
  children,
  onClick,
  className,
  ...props
}) => {
  const { open, setOpen } = useCollapsibleContext();

  const handleTriggerClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setOpen(!open);
    onClick?.(event);
  };

  return (
    <Button
      className={triggerVariants({ open, className })}
      onClick={handleTriggerClick}
      variant="outline"
      {...props}
    >
      {children}
      <Icon name="chevron-down" className={indicatorVariants({ open })} />
    </Button>
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

const indicatorVariants = cva('transition', {
  variants: {
    open: {
      true: 'transform rotate-180',
    },
  },
});

export type CollapsibleContentProps = React.HTMLAttributes<HTMLDivElement>;

export const CollapsibleContent: React.FC<CollapsibleContentProps> = ({
  children,
  className,
}) => {
  const { open } = useCollapsibleContext();

  const collapserRef = useRef<HTMLDivElement>(null);

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
    <div ref={collapserRef} className={collapserVariants({ open, className })}>
      {children}
    </div>
  );
};

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

type CollapsibleContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const [CollapsibleProvider, useCollapsibleContext] =
  createContext<CollapsibleContext>({
    hookName: 'useCollapsibleContext',
    name: 'CollapsibleContext',
    providerName: 'CollapsibleProvider',
  });
