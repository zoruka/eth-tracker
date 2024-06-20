export const routes = {
  home: () => '/',
  address: (address) => `/${address}`,
} as const satisfies Routes;

type Route = ((params: string | number) => string) | Routes;

type Routes = {
  [key: string]: Route;
};
