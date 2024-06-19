'use server';

import { Account, Domain } from '@/lib/core';
import { createSafeAction } from '../infra/actions';
import { cacheRequest } from '../infra/cache-request';

export const getAccountBalance = createSafeAction<
  GetAccountBalance.Params,
  GetAccountBalance.Result
>(async (address) => {
  return cacheRequest(
    `account-balance-${address}`,
    () => Account.getBalancesFor(address),
    180_000
  );
});

export namespace GetAccountBalance {
  export type Params = string;
  export type Result = Domain.Account.Balance[];
}
