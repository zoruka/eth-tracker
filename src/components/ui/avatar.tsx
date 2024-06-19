import { VariantProps, cva } from 'class-variance-authority';
import { Icon, IconName } from '../icon';

export type AvatarProps = {
  src?: string;
  fallbackIcon: IconName;
  alt: string;
  className?: string;
} & VariantProps<typeof avatarVariants>;

export const Avatar: React.FC<AvatarProps> = ({
  src,
  fallbackIcon,
  alt,
  className,
  size = 'md',
}) => {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={avatarVariants({ className, size })}
      />
    );
  }

  return (
    <Icon
      name={fallbackIcon}
      className={avatarVariants({ className, size, icon: true })}
    />
  );
};

const avatarVariants = cva(
  'flex items-center justify-center rounded-full overflow-hidden object-cover border bg-primary text-primary-foreground',
  {
    variants: {
      size: {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
      },
      icon: {
        true: 'p-1',
      },
    },
  }
);
