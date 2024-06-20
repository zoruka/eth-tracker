import Link from 'next/link';
import { Logo } from './logo';
import { routes } from '@/config/routes';

export type NavbarProps = React.PropsWithChildren<{}>;

export const Navbar: React.FC<NavbarProps> = ({
  children = <DefaultNavbarContent />,
}) => {
  return (
    <nav className="w-full bg-background border-b sticky top-0 h-navbar z-10">
      <div className="flex items-center justify-center w-content max-w-full h-full m-auto">
        {children}
      </div>
    </nav>
  );
};

const DefaultNavbarContent: React.FC = () => {
  return (
    <Link href={routes.home()}>
      <Logo />
    </Link>
  );
};
