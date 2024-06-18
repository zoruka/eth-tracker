import { Account } from '@/lib/core/domain';
import { formatAddress } from '@/lib/utils/format';
import { HistoryLogTransfers } from './history-log-transfers';

export type HistoryFragmentProps = {
  history: Account.HistoryLog[];
};

export const HistoryFragment: React.FC<HistoryFragmentProps> = ({
  history,
}) => {
  return (
    <ul className="flex flex-col gap-4">
      {history.map((log) => (
        <HistoryLog key={log.hash} log={log} />
      ))}
    </ul>
  );
};

type HistoryLogProps = {
  log: Account.HistoryLog;
};

const HistoryLog: React.FC<HistoryLogProps> = ({ log }) => {
  return (
    <li className="flex flex-col w-full border p-4 gap-4 bg-secondary rounded">
      <div className="grid grid-cols-5 gap-2">
        <span className="uppercase">
          <b>{log.chain}</b>
          {log.operation}
        </span>
        <span>{log.status}</span>
        <span>{formatAddress(log.from)}</span>
        <span>{formatAddress(log.to)}</span>
        <span>{log.timestamp}</span>
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
