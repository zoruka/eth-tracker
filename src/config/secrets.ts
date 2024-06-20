export const secrets = {
  ethereum: {
    rpcUrl: process.env.ETHEREUM__RPC_URL as string,
  },
  wc: {
    projectId: process.env.WC__PROJECT_ID as string,
  },
  ens: {
    subgraphUrl: process.env.ENS__SUBGRAPH_URL as string,
  },
};
