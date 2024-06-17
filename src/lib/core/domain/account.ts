export namespace Account {
  export type Balance = {
    name: string;
    symbol: string;
    quantity: number;
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
    imageUrl?: string;
    direction: 'in' | 'out' | 'self';
    quantity: number;
    value?: number;
    price?: number;
  };
}
