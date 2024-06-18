export type Network = {
  id: string;
  name: string;
  iconUrl: string;
  explorer: {
    tx: (hash: string) => string;
    address: (address: string) => string;
  };
};
