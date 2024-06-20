import { Domain, networks } from '../core';

export const parseNetworkId = (
  networkId?: string
): Domain.Network | undefined => {
  return networkId ? networks[networkId] ?? undefined : undefined;
};
