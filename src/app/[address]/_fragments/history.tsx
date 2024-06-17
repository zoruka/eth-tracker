import { Account } from '@/lib/core/domain';
import { formatAddress } from '@/lib/utils/format';

export type HistoryFragmentProps = {
  history: Account.HistoryLog[];
};

export const HistoryFragment: React.FC<HistoryFragmentProps> = ({
  history,
}) => {
  return (
    <ul className="flex flex-col gap-2">
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
    <li className="flex flex-col w-full border p-2 gap-2 bg-secondary rounded">
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

      {log.transfers.length > 0 && (
        <div className="flex flex-col w-full border gap-2 p-2">
          {log.transfers.map((transfer, index) => (
            <Transfer key={index} transfer={transfer} />
          ))}
        </div>
      )}
    </li>
  );
};

type TransferProps = {
  transfer: Account.HistoryLogTransfer;
};

const Transfer: React.FC<TransferProps> = ({ transfer }) => {
  return (
    <div className="grid grid-cols-6 gap-2">
      <img
        src={transfer.imageUrl}
        alt={transfer.name}
        className="w-16 h-16 rounded"
      />
      <span>{transfer.name}</span>
      <span>{transfer.direction}</span>
      <span>{transfer.quantity}</span>
      <span>{transfer.value}</span>
      <span>{transfer.price}</span>
    </div>
  );
};
