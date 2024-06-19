'use server';

import { Account, Domain } from '@/lib/core';
import { createSafeAction } from '../infra/actions';
import { cacheRequest } from '../infra/cache-request';

export const getAccountHistory = createSafeAction(
  async (address: string): Promise<Domain.Account.HistoryLog[]> => {
    const history = await cacheRequest(
      `account-history-${address}`,
      () => Account.getHistoryFor(address),
      180_000
    );

    return history;
  }
);
