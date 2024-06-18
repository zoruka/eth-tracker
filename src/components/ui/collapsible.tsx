'use client';

import { cva } from 'class-variance-authority';
import { useState } from 'react';
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

  const handleTriggerClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button
        className="flex items-center justify-center p-2 rounded"
        onClick={handleTriggerClick}
      >
        {trigger}
      </Button>
      <div className={collapserVariants({ open })}>{children}</div>
    </>
  );
};

const collapserVariants = cva('w-full overflow-hidden', {
  variants: {
    open: {
      true: 'h-auto opacity-100',
      false: 'h-0 opacity-0',
    },
  },
});
