import { BlockchainApiController, OptionsController } from '@web3modal/core';
import { Account } from '../domain';
import { EnsAdapter } from '../adapter/ens-adapter';
import { EthereumAdapter } from '../adapter/ethereum-adapter';
import { secrets } from '@/config/secrets';
import { networks } from '../constants/networks';

export class AccountController implements Account.Controller {
  private ensAdapter: EnsAdapter;
  private ethereumAdapter: EthereumAdapter;
  private blockchainApi: AccountController.BlockchainApi;

  constructor({
    ensAdapter,
    ethereumAdapter,
    blockchainApi,
  }: AccountController.Params = {}) {
    this.ensAdapter = ensAdapter || new EnsAdapter();
    this.ethereumAdapter = ethereumAdapter || new EthereumAdapter();

    if (blockchainApi) {
      this.blockchainApi = blockchainApi;
    } else {
      this.blockchainApi = BlockchainApiController;
      OptionsController.setProjectId(secrets.wc.projectId);
    }
  }

  getMetadataFor: Account.Controller['getMetadataFor'] = async (address) => {
    const [names, isContract] = await Promise.all([
      this.ensAdapter.reverseResolve(address),
      this.ethereumAdapter.isContract(address),
    ]);

    return {
      address,
      type: isContract ? 'contract' : 'wallet',
      names,
    };
  };

  getBalancesFor: Account.Controller['getBalancesFor'] = async (address) => {
    const { balances } = await this.blockchainApi.getBalance(address);

    const supportedChains = new Set(Object.keys(networks));

    return balances
      .filter((balance) => supportedChains.has(balance.chainId))
      .map((balance) => ({
        chainId: balance.chainId,
        name: balance.name,
        symbol: balance.symbol,
        quantity: Number(balance.quantity.numeric),
        iconUrl: balance.iconUrl,
      }));
  };

  getHistoryFor: Account.Controller['getHistoryFor'] = async (
    address,
    cursor
  ) => {
    try {
      const { data, next } = await this.blockchainApi.fetchTransactions({
        account: address,
        projectId: secrets.wc.projectId,
        cursor,
      });

      return {
        logs: data.map(({ metadata, transfers }) => ({
          hash: metadata.hash,
          chain: metadata.chain,
          from: metadata.sentFrom,
          to: metadata.sentTo,
          timestamp: metadata.minedAt,
          operation: metadata.operationType,
          status: metadata.status,
          transfers: transfers.map((transfer) => ({
            name: transfer.fungible_info?.name || transfer.nft_info?.name,
            imageUrl:
              transfer.fungible_info?.icon?.url ||
              transfer.nft_info?.content?.preview?.url,
            direction: transfer.direction,
            quantity: Number(transfer.quantity.numeric),
            value: transfer.value,
            price: transfer.price,
          })),
        })),
        cursor: next,
      };
    } catch (e) {
      console.log('Failed to get history data', e);

      return { logs: [], cursor: null };
    }
  };
}

export namespace AccountController {
  export type Params = {
    ensAdapter?: EnsAdapter;
    ethereumAdapter?: EthereumAdapter;
    blockchainApi?: BlockchainApi;
  };

  export type BlockchainApi = Pick<
    typeof BlockchainApiController,
    'getBalance' | 'fetchTransactions'
  >;
}
