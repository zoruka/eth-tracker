'use server';

import { Account, Domain } from '@/lib/core';
import { createSafeAction } from '../infra/actions';
import { cacheRequest } from '../infra/cache-request';

export const getAccountBalance = createSafeAction(
  async (address: string): Promise<Domain.Account.Balance[]> => {
    const balance = await cacheRequest(
      `account-balance-${address}`,
      () => Account.getBalancesFor(address),
      180_000
    );

    return balance;
  }
);
