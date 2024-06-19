'use server';

import { Account, Domain } from '@/lib/core';
import { createSafeAction } from '../infra/actions';
import { cacheRequest } from '../infra/cache-request';

export const getAccountHistory = createSafeAction<
  GetAccountHistory.Params,
  GetAccountHistory.Result
>(async ({ address, cursor }) => {
  return cacheRequest(
    `account-history-${address}-${cursor}`,
    () => Account.getHistoryFor(address, cursor),
    60_000
  );
});

export namespace GetAccountHistory {
  export type Params = {
    address: string;
    cursor?: string;
  };

  export type Result = {
    logs: Domain.Account.HistoryLog[];
    cursor: string | null;
  };
}
