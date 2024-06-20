import { ExternalLink } from '../ui/external-link';

export type FooterProps = React.PropsWithChildren<{}>;

export const Footer: React.FC<FooterProps> = ({
  children = <DefaultFooterContent />,
}) => {
  return (
    <footer className="w-full bg-background border-t bg-primary text-primary-foreground h-footer">
      <div className="flex items-center justify-center w-content max-w-full h-full m-auto">
        {children}
      </div>
    </footer>
  );
};

const DefaultFooterContent: React.FC = () => {
  return (
    <span className="font-light">
      Made with ❤️ by&nbsp;
      <a
        className="text-primary-foreground underline font-medium"
        href="https://zoruka.xyz"
        target="_blank"
      >
        zoruka
      </a>
    </span>
  );
};
