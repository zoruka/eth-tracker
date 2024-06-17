export const ColorPalette: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-2 p-8">
      <div className="bg-primary w-16 h-16 border">
        <div className="bg-primary-foreground w-10 h-10" />
      </div>

      <div className="bg-secondary w-16 h-16 border ring">
        <div className="bg-secondary-foreground w-10 h-10" />
      </div>

      <div className="bg-background w-16 h-16 border ring">
        <div className="bg-foreground w-10 h-10" />
      </div>

      <div className="bg-muted w-16 h-16 border ring">
        <div className="bg-muted-foreground w-10 h-10" />
      </div>

      <div className="bg-accent w-16 h-16 border ring">
        <div className="bg-accent-foreground w-10 h-10" />
      </div>

      <div className="bg-destructive w-16 h-16 border ring">
        <div className="bg-destructive-foreground w-10 h-10" />
      </div>
    </div>
  );
};
