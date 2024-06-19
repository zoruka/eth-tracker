export type WithLabelProps = React.PropsWithChildren<{
  label: string;
}>;

export const WithLabel: React.FC<WithLabelProps> = ({ label, children }) => {
  return (
    <div className="inline-flex items-center gap-1">
      <span className="text-xs uppercase font-light text-foreground/60 leading-3">
        {label}:
      </span>
      {children}
    </div>
  );
};
