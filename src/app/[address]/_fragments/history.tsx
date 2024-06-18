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

      {log.transfers.length > 0 && (
        <Collapsible trigger="Transfers">
          <div className="hidden md:grid grid-cols-[4rem_2fr_4rem_1fr_1fr_1fr] border-b py-2 px-4 gap-4">
            <div />
            <span className={cellTitleVariants()}>{transferColumns.name}</span>
            <span className={cellTitleVariants()}>
              {transferColumns.direction}
            </span>
            <span className={cellTitleVariants()}>
              {transferColumns.quantity}
            </span>
            <span className={cellTitleVariants()}>{transferColumns.value}</span>
            <span className={cellTitleVariants()}>{transferColumns.price}</span>
          </div>

          <div className="flex flex-col w-full gap-4 p-4">
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
    <div className="grid grid-cols-4 md:grid-cols-[4rem_2fr_4rem_1fr_1fr_1fr] [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-4 gap-4">
      <TransferCell className="col-span-1 md:col-span-1/2">
        <img
          src={transfer.imageUrl}
          alt={transfer.name}
          className="w-12 h-12 rounded"
        />
      </TransferCell>

      <TransferCell
        className="font-bold col-span-3 md:col-span-1 items-start"
        title={transferColumns.name}
      >
        {transfer.name}
      </TransferCell>

      <TransferCell
        title={transferColumns.direction}
        className="col-span-2 md:col-span-1"
      >
        <Badge color={directionColor} className="text-sm">
          <Icon name={`tx-${transfer.direction}`} />
          {transfer.direction}
        </Badge>
      </TransferCell>

      <TransferCell
        title={transferColumns.quantity}
        className="col-span-2 md:col-span-1"
      >
        {transfer.quantity}
      </TransferCell>

      {transfer.value && (
        <TransferCell
          title={transferColumns.value}
          className="col-span-2 md:col-span-1"
        >
          {transfer.value}
        </TransferCell>
      )}

      {transfer.price && (
        <TransferCell
          title={transferColumns.price}
          className="col-span-2 md:col-span-1"
        >
          {transfer.price}
        </TransferCell>
      )}
    </div>
  );
};

type TransferCellProps = React.HTMLAttributes<HTMLSpanElement> & {
  title?: string;
};

const TransferCell: React.FC<TransferCellProps> = ({
  children,
  className,
  title,
}) => {
  return (
    <div className={transferCellVariants({ className })}>
      {title && (
        <span className={cellTitleVariants({ className: 'block md:hidden' })}>
          {title}
        </span>
      )}
      {children && (
        <span className="flex items-center justify-center flex-1">
          {children}
        </span>
      )}
    </div>
  );
};

const transferCellVariants = cva(
  'flex flex-col items-center justify-center gap-1'
);

const cellTitleVariants = cva(
  'text-center text-xs text-foreground/30 uppercase font-bold'
);

const transferColumns = {
  name: 'Name',
  direction: 'Direction',
  quantity: 'Quantity',
  value: 'Value',
  price: 'Price',
};
