export namespace Account {
  export type Metadata = {
    address: string;
    names: string[];
    avatarUrl?: string;
    type: 'contract' | 'wallet';
  };

  export type Balance = {
    name: string;
    symbol: string;
    quantity: number;
    chainId: string;
    iconUrl?: string;
  };

  export type HistoryLog = {
    operation: string;
    hash: string;
    status:
      | 'confirmed'
      | 'failed'
      | 'pending'
      | 'ONRAMP_TRANSACTION_STATUS_SUCCESS'
      | 'ONRAMP_TRANSACTION_STATUS_IN_PROGRESS'
      | 'ONRAMP_TRANSACTION_STATUS_FAILED';
    chain?: string;
    from: string;
    to: string;
    timestamp: string;
    transfers: HistoryLogTransfer[];
  };

  export type HistoryLogTransfer = {
    name?: string;
    symbol?: string;
    imageUrl?: string;
    direction: 'in' | 'out' | 'self';
    quantity: number;
    value?: number;
    price?: number;
  };

  export type Controller = {
    getMetadataFor: (address: string) => Promise<Metadata>;
    getBalancesFor: (address: string) => Promise<Balance[]>;
    getHistoryFor: (
      address: string,
      cursor?: string
    ) => Promise<{ logs: HistoryLog[]; cursor: string | null }>;
  };
}
