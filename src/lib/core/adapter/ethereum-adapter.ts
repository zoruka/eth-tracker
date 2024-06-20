import { secrets } from '@/config/secrets';
import { Address, PublicClient, createPublicClient, http } from 'viem';
import { getCode } from 'viem/actions';
import { mainnet } from 'viem/chains';

export class EthereumAdapter {
  private client: PublicClient;

  constructor({ client }: EthereumAdapter.Params = {}) {
    this.client =
      client ||
      createPublicClient({
        chain: mainnet,
        transport: http(secrets.ethereum.rpcUrl),
      });
  }

  isContract = async (address: string) => {
    const bytecode = await getCode(this.client, {
      address: address as Address,
    });

    return Boolean(bytecode);
  };
}

export namespace EthereumAdapter {
  export type Params = {
    client?: PublicClient;
  };
}
