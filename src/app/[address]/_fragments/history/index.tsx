import { Account } from '@/lib/core/domain';
import { HistoryLogTransfers } from './history-log-transfers';
import { networks } from '@/lib/core/constants/networks';
import { Badge } from '@/components/ui/badge';
import { Network } from '@/lib/core/domain/network';
import { formatAddress } from '@/lib/utils/format';
import { Icon } from '@/components/icon';
import { WithLabel } from '@/components/ui/with-label';

export type HistoryFragmentProps = {
  history: Account.HistoryLog[];
};

export const HistoryFragment: React.FC<HistoryFragmentProps> = ({
  history,
}) => {
  return (
    <>
      <h1 className="text-xl text-center font-bold m-8">History</h1>
      <ul className="flex flex-col gap-4">
        {history.map((log) => (
          <HistoryLog key={log.hash} log={log} />
        ))}
      </ul>
    </>
  );
};

type HistoryLogProps = {
  log: Account.HistoryLog;
};

const HistoryLog: React.FC<HistoryLogProps> = ({ log }) => {
  const network = log.chain ? networks[log.chain] ?? undefined : undefined;

  return (
    <li className="flex flex-col w-full border p-4 gap-4 bg-secondary rounded">
      <div className="grid grid-cols-1 gap-2 relative">
        <WithLabel label="Network">
          <NetworkBadge network={network} />
        </WithLabel>
        <WithLabel label="Operation">{log.operation}</WithLabel>
        <WithLabel label="Status">{log.status}</WithLabel>

        <div className="inline-flex gap-2 items-center">
          <WithLabel label="From">
            <AddressLink address={log.from} network={network} type="address" />
          </WithLabel>
          <Icon name="arrow-right" />
          <WithLabel label="To">
            <AddressLink address={log.to} network={network} type="address" />
          </WithLabel>
        </div>

        <WithLabel label="Hash">
          <AddressLink address={log.hash} network={network} type="tx" />
        </WithLabel>

        <Timestamp timestamp={log.timestamp} />
      </div>

      {log.transfers.length > 0 ? (
        <HistoryLogTransfers log={log} />
      ) : (
        <span className="text-foreground/60  italic text-center font-light">
          There are no transfers for this transaction
        </span>
      )}
    </li>
  );
};

type NetworkBadgeProps = {
  network?: Network;
};

const NetworkBadge: React.FC<NetworkBadgeProps> = ({ network }) => {
  return <Badge className="text-xs">{network?.name || 'Unknown'}</Badge>;
};

type AddressLinkProps = {
  type: 'address' | 'tx';
  address: string;
  network?: Network;
};

const AddressLink: React.FC<AddressLinkProps> = ({
  network,
  address,
  type,
}) => {
  if (network) {
    return (
      <a
        href={network.explorer[type](address)}
        target="_blank"
        rel="noreferrer"
        className="text-primary underline"
      >
        {formatAddress(address)}
      </a>
    );
  }

  return <span>{address}</span>;
};

const Timestamp: React.FC<{ timestamp: string }> = ({ timestamp }) => {
  return (
    <span className="absolute top-[-1.5rem] justify-self-center text-xs text-primary-foreground font-bold bg-primary rounded-full px-2 py-1 border">
      {new Date(timestamp).toLocaleString()}
    </span>
  );
};
