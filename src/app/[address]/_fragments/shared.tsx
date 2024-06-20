export type SectionHeaderProps = React.PropsWithChildren<{}>;

export const SectionHeader: React.FC<SectionHeaderProps> = ({ children }) => {
  return <h2 className="text-xl text-center font-bold m-8">{children}</h2>;
};

export type EmptyMessageProps = React.PropsWithChildren<{}>;

export const EmptyMessage: React.FC<EmptyMessageProps> = ({ children }) => {
  return (
    <span className="text-foreground/60 italic text-center font-light">
      {children}
    </span>
  );
};
