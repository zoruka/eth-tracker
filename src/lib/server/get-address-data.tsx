import { secrets } from '@/config/secrets';
import {
  BlockchainApiController,
  EnsController,
  OptionsController,
} from '@web3modal/core';
import { type Account } from '../core/domain';

OptionsController.setProjectId(secrets.wc.projectId);

export const getAddressData = async (address: string) => {
  const [balance, ens, history] = await Promise.all([
    getBalances(address),
    getENS(address),
    getHistory(address),
  ]);

  return {
    balance,
    ens,
    history,
  };
};

const getBalances = async (address: string): Promise<Account.Balance[]> => {
  const { balances } = await BlockchainApiController.getBalance(address);

  return balances.map((balance) => ({
    name: balance.name,
    symbol: balance.symbol,
    quantity: Number(balance.quantity.numeric),
    iconUrl: balance.iconUrl,
  }));
};

const getHistory = async (address: string): Promise<Account.HistoryLog[]> => {
  const { data } = await BlockchainApiController.fetchTransactions({
    account: address,
    projectId: secrets.wc.projectId,
  });

  return data.map(({ metadata, transfers }) => ({
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
  }));
};

const getENS = async (address: string) => {
  const ens = await EnsController.getNamesForAddress(address);

  return ens;
};
