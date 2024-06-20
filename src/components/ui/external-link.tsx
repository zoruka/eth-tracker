import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { Icon } from '../icon';

export type ExternalLinkProps = {
  href: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        className={externalLinkVariants({ className })}
        {...props}
      >
        {children} <Icon name="external-link" />
      </a>
    );
  }
);
ExternalLink.displayName = 'ExternalLink';

const externalLinkVariants = cva(
  'inline-flex items-center text-primary underline gap-[0.25em] rounded focus-visible:outline-none focus-visible:ring focus-visible:ring-2'
);
