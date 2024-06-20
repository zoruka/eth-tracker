import { AccountController } from './controller/account-controller';
import * as Domain from './domain';
import { EnsAdapter } from './adapter/ens-adapter';
import { EthereumAdapter } from './adapter/ethereum-adapter';
import { networks } from './constant/networks';
import { Logger } from './util/logger';

const Account = new AccountController({
  ensAdapter: new EnsAdapter(),
  ethereumAdapter: new EthereumAdapter(),
});

export { Domain, Account, Logger, networks };
