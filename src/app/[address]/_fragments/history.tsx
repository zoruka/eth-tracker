import { Icon } from '@/components/icon';
import { Badge } from '@/components/ui/badge';
import { Collapsible } from '@/components/ui/collapsible';
import { Account } from '@/lib/core/domain';
import { formatAddress } from '@/lib/utils/format';
import { cva } from 'class-variance-authority';

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
        <Collapsible trigger="Transfers">
          <div className="flex flex-col w-full border gap-2 p-2">
            {log.transfers.map((transfer, index) => (
              <Transfer key={index} transfer={transfer} />
            ))}
          </div>
        </Collapsible>
      )}
    </li>
  );
};

type TransferProps = {
  transfer: Account.HistoryLogTransfer;
};

const Transfer: React.FC<TransferProps> = ({ transfer }) => {
  const directionColor = (
    {
      in: 'success',
      out: 'destructive',
      self: 'primary',
    } as const
  )[transfer.direction];

  return (
    <div className="grid grid-cols-[auto_2fr_auto_1fr_1fr_1fr] [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-2">
      <img
        src={transfer.imageUrl}
        alt={transfer.name}
        className="w-16 h-16 rounded"
      />
      <TransferCell className="font-bold">{transfer.name}</TransferCell>

      <TransferCell>
        <Badge color={directionColor} className="text-sm">
          <Icon name={`tx-${transfer.direction}`} />
          {transfer.direction}
        </Badge>
      </TransferCell>

      <TransferCell>{transfer.quantity}</TransferCell>
      <TransferCell>{transfer.value || '-'}</TransferCell>
      <TransferCell>{transfer.price || '-'}</TransferCell>
    </div>
  );
};

type TransferCellProps = React.HTMLAttributes<HTMLSpanElement>;

const TransferCell: React.FC<TransferCellProps> = ({ children, className }) => {
  return (
    <span className={transferCellVariants({ className })}>{children}</span>
  );
};

const transferCellVariants = cva('flex items-center justify-center');
