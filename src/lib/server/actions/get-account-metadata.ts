'use server';

import { Account, Domain } from '@/lib/core';
import { cacheRequest } from '../infra/cache-request';
import { createSafeAction } from '../infra/actions';

export const getAccountMetadata = createSafeAction<
  GetAccountMetadata.Params,
  GetAccountMetadata.Result
>(async (address) => {
  return cacheRequest(
    `account-metadata-${address}`,
    () => Account.getMetadataFor(address),
    60_000
  );
});

export namespace GetAccountMetadata {
  export type Params = string;
  export type Result = Domain.Account.Metadata;
}
