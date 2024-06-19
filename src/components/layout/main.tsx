export type MainProps = React.PropsWithChildren<{}>;

export const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className="flex flex-col w-content max-w-full min-h-main m-auto px-2 py-8">
      {children}
    </main>
  );
};
