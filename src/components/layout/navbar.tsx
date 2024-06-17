import { Logo } from './logo';

export type NavbarProps = React.PropsWithChildren<{}>;

export const Navbar: React.FC<NavbarProps> = ({
  children = <DefaultNavbarContent />,
}) => {
  return (
    <nav className="w-full bg-background border-b sticky top-0 h-navbar">
      <div className="flex items-center justify-center w-content max-w-full h-full m-auto">
        {children}
      </div>
    </nav>
  );
};

const DefaultNavbarContent: React.FC = () => {
  return <Logo />;
};
