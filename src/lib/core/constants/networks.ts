import { Network } from '../domain/network';

/**
 * Warning: Currently supporting only mostly used networks.
 * More networks can be added following https://github.com/WalletConnect/blockchain-api/blob/master/SUPPORTED_CHAINS.md
 */
export const networks = Object.freeze({
  'eip155:1': {
    id: 'eip155:1',
    name: 'Ethereum Mainnet',
    iconUrl: '/chains/ethereum.svg',
    explorer: {
      tx: (hash: string) => `https://etherscan.io/tx/${hash}`,
      address: (address: string) => `https://etherscan.io/address/${address}`,
    },
  },
  'eip155:10': {
    id: 'eip155:10',
    name: 'Optimism Mainnet',
    iconUrl: '/chains/optimism.svg',
    explorer: {
      tx: (hash: string) => `https://optimistic.etherscan.io/tx/${hash}`,
      address: (address: string) =>
        `https://optimistic.etherscan.io/address/${address}`,
    },
  },
  'eip155:56': {
    id: 'eip155:56',
    name: 'Binance Smart Chain',
    iconUrl: '/chains/binance.svg',
    explorer: {
      tx: (hash: string) => `https://bscscan.com/tx/${hash}`,
      address: (address: string) => `https://bscscan.com/address/${address}`,
    },
  },
  'eip155:137': {
    id: 'eip155:137',
    name: 'Polygon',
    iconUrl: '/chains/polygon.svg',
    explorer: {
      tx: (hash: string) => `https://polygonscan.com/tx/${hash}`,
      address: (address: string) =>
        `https://polygonscan.com/address/${address}`,
    },
  },
  'eip155:42161': {
    id: 'eip155:42161',
    name: 'Arbitrum One',
    iconUrl: '/chains/arbitrum.svg',
    explorer: {
      tx: (hash: string) => `https://arbiscan.io/tx/${hash}`,
      address: (address: string) => `https://arbiscan.io/address/${address}`,
    },
  },
  'eip155:11155111': {
    id: 'eip155:11155111',
    name: 'Ethereum Sepolia',
    iconUrl: '/chains/ethereum.svg',
    explorer: {
      tx: (hash: string) => `https://sepolia.etherscan.io/tx/${hash}`,
      address: (address: string) =>
        `https://sepolia.etherscan.io/address/${address}`,
    },
  },
  'near:mainnet': {
    id: 'near:mainnet',
    name: 'NEAR Mainnet',
    iconUrl: '/chains/near.svg',
    explorer: {
      tx: (hash: string) => `https://explorer.near.org/transactions/${hash}`,
      address: (address: string) =>
        `https://explorer.near.org/accounts/${address}`,
    },
  },
  'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': {
    id: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    name: 'Solana Mainnet',
    iconUrl: '/chains/solana.svg',
    explorer: {
      tx: (hash: string) => `https://explorer.solana.com/tx/${hash}`,
      address: (address: string) =>
        `https://explorer.solana.com/address/${address}`,
    },
  },
}) as Readonly<Record<string, Network>>;
