'use server';

import { Account, Domain } from '@/lib/core';
import { cacheRequest } from '../infra/cache-request';
import { createSafeAction } from '../infra/actions';

export const getAccountMetadata = createSafeAction(
  async (address: string): Promise<Domain.Account.Metadata> => {
    const metadata = await cacheRequest(
      `account-metadata-${address}`,
      () => Account.getMetadataFor(address),
      180_000
    );

    return metadata;
  }
);
