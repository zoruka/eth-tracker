# Eth-Tracker

This project is about a Next.js application that tracks Balances, Transactions and the reverse ENS names for a given Ethereum address.

Access the running project [here](https://ethtracker.zoruka.xyz).

## Technologies

- The project consumes the [WalletConnect Blockchain API](https://github.com/WalletConnect/blockchain-api) using the [Web3Modal core package](https://github.com/WalletConnect/web3modal/tree/main/packages/core) for gathering the addresses balances and transactions;
- The ENS names are fetched from the [ENS Subgraph](https://thegraph.com/hosted-service/subgraph/ensdomains/ens);
- The UI is built using [Tailwind CSS](https://tailwindcss.com/) and the components are inspired in the [shadc/ui](https://ui.shadcn.com/) library;
- The deployment was made through [Vercel](https://vercel.com).

## Running It

To run it, first install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
