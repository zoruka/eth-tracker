import { Badge } from '@/components/ui/badge';
import { formatAddress, formatCompactNumber } from '@/lib/utils/format';
import { Icon } from '@/components/icon';
import { WithLabel } from '@/components/ui/with-label';
import { Domain, networks } from '@/lib/core';
import { Collapsible } from '@/components/ui/collapsible';
import { Account } from '@/lib/core/domain';
import { cva } from 'class-variance-authority';
import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink } from '@/components/ui/external-link';

export type HistoryLogProps = {
  log: Domain.Account.HistoryLog;
};

export const HistoryLog: React.FC<HistoryLogProps> = ({ log }) => {
  const network = log.chain ? networks[log.chain] ?? undefined : undefined;

  return (
    <li className="flex flex-col w-full border p-4 gap-4 bg-secondary rounded relative">
      <Timestamp timestamp={log.timestamp} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 gap-2">
          <WithLabel label="Network">
            <NetworkBadge network={network} />
          </WithLabel>
          <WithLabel label="Operation">
            <OperationBadge operation={log.operation} />
          </WithLabel>
          <WithLabel label="Status">
            <StatusBadge status={log.status} />
          </WithLabel>

          <div className="inline-flex gap-2 items-center">
            <WithLabel label="From">
              <AddressLink
                address={log.from}
                network={network}
                type="address"
              />
            </WithLabel>
            <Icon name="arrow-right" />
            <WithLabel label="To">
              <AddressLink address={log.to} network={network} type="address" />
            </WithLabel>
          </div>

          <WithLabel label="Hash">
            <AddressLink address={log.hash} network={network} type="tx" />
          </WithLabel>
        </div>

        <TransactionSummary log={log} />
      </div>

      {log.transfers.length > 0 ? (
        <Transfers log={log} />
      ) : (
        <HistoryLogMessage message="There are no transfers for this transaction" />
      )}
    </li>
  );
};

export const HistoryLogFallback: React.FC = () => {
  return new Array(3).fill(0).map((_, index) => (
    <li
      key={index}
      className="flex flex-col w-full h-[22.4375rem] md:h-[15.1875rem] border p-4 gap-2 bg-secondary rounded relative"
    >
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-6 w-4/5" />
      <Skeleton className="h-6 w-3/5" />
      <Skeleton className="h-6 w-4/5" />
      <Skeleton className="h-6 w-1/2" />
      <div className="flex-1 flex items-end mt-2">
        <Skeleton className="h-8 w-full" />
      </div>
    </li>
  ));
};

export type HistoryLogMessageProps = {
  message: string;
};

export const HistoryLogMessage: React.FC<HistoryLogMessageProps> = ({
  message,
}) => {
  return (
    <span className="text-foreground/60 italic text-center font-light">
      {message}
    </span>
  );
};

type TransactionSummaryProps = {
  log: Domain.Account.HistoryLog;
};

const TransactionSummary: React.FC<TransactionSummaryProps> = ({ log }) => {
  const value = log.transfers.reduce(
    (acc, transfer) =>
      acc + (transfer.direction === 'out' ? -1 : 1) * (transfer.value ?? 0),
    0
  );

  return (
    <div className="flex flex-col items-center md:items-end gap-2">
      {log.transfers.length > 0 && (
        <div className="flex flex-row pl-[0.6rem]">
          {log.transfers.map((transfer, index) => (
            <div
              key={index}
              className="-ml-2 relative w-12 h-12 border border-4 rounded-md overflow-hidden bg-border"
            >
              <Avatar
                key={index}
                src={transfer.imageUrl}
                fallbackIcon="coin"
                alt={transfer.name || 'transfer-image'}
                size="lg"
                className="rounded-md"
              />
              <div className="absolute flex items-center justify-center -bottom-1 -left-1 bg-border rounded-tr p-1 w-5 h-5">
                {transfer.direction === 'in' && (
                  <Icon name="plus" className="text-success" />
                )}
                {transfer.direction === 'out' && (
                  <Icon name="minus" className="text-destructive" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="inline-flex items-end mt-1">
        <span
          className={`text-lg leading-4 ${value > 0 && 'text-success'} ${
            value < 0 && 'text-destructive'
          }
          }`}
        >
          {value > 0 && '+'}
          {formatCompactNumber(value)}
        </span>
        <span className="text-foreground/60 font-light ml-1 text-xs leading-3">
          USD
        </span>
      </div>
    </div>
  );
};

type NetworkBadgeProps = {
  network?: Domain.Network;
};

const NetworkBadge: React.FC<NetworkBadgeProps> = ({ network }) => {
  return (
    <Badge className={dataBadgeVariants()}>
      <Avatar
        src={network?.iconUrl}
        fallbackIcon="network"
        alt={network?.name || 'network icon'}
        size="xs"
      />
      {network?.name || 'Unknown'}
    </Badge>
  );
};

type StatusBadgeProps = {
  status: Domain.Account.HistoryLog['status'];
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const [color, icon] = (
    {
      confirmed: ['success', 'check'],
      failed: ['destructive', 'cross'],
      pending: [undefined, 'spinner'],
      ONRAMP_TRANSACTION_STATUS_SUCCESS: ['success', 'check'],
      ONRAMP_TRANSACTION_STATUS_IN_PROGRESS: [undefined, 'spinner'],
      ONRAMP_TRANSACTION_STATUS_FAILED: ['destructive', 'cross'],
    } as const
  )[status];

  return (
    <Badge color={color} className={dataBadgeVariants()}>
      <Icon name={icon} />
      {status}
    </Badge>
  );
};

type OperationBadgeProps = {
  operation: string;
};

const OperationBadge: React.FC<OperationBadgeProps> = ({ operation }) => {
  return <Badge className={dataBadgeVariants()}>{operation}</Badge>;
};

const dataBadgeVariants = cva('text-xs min-w-fit gap-1');

type AddressLinkProps = {
  type: 'address' | 'tx';
  address: string;
  network?: Domain.Network;
};

const AddressLink: React.FC<AddressLinkProps> = ({
  network,
  address,
  type,
}) => {
  if (network) {
    return (
      <ExternalLink href={network.explorer[type](address)}>
        {formatAddress(address)}
      </ExternalLink>
    );
  }

  return <span>{address}</span>;
};

const Timestamp: React.FC<{ timestamp: string }> = ({ timestamp }) => {
  return (
    <span className="absolute top-0 -translate-x-1/2 left-[50%] -translate-y-1/2 justify-self-center text-xs text-primary-foreground font-bold bg-primary rounded-full px-2 py-1 border">
      {new Date(timestamp).toLocaleString()}
    </span>
  );
};

type TransfersProps = {
  log: Account.HistoryLog;
};

const Transfers: React.FC<TransfersProps> = ({ log }) => {
  return (
    <Collapsible trigger="Transfers Breakdown">
      <div className="hidden md:grid grid-cols-[4rem_2fr_4rem_1fr_1fr_1fr] border-b py-2 px-4 gap-4">
        <div />
        <span className={cellTitleVariants()}>{transferColumns.name}</span>
        <span className={cellTitleVariants()}>{transferColumns.direction}</span>
        <span className={cellTitleVariants()}>{transferColumns.quantity}</span>
        <span className={cellTitleVariants()}>{transferColumns.value}</span>
        <span className={cellTitleVariants()}>{transferColumns.price}</span>
      </div>

      <div className="flex flex-col w-full gap-4 p-4">
        {log.transfers.map((transfer, index) => (
          <Transfer key={index} transfer={transfer} />
        ))}
      </div>
    </Collapsible>
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
        <Avatar
          className="rounded-md"
          size="lg"
          src={transfer.imageUrl}
          alt={transfer.name || 'transfer-image'}
          fallbackIcon="coin"
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
        unity={transfer.symbol}
      >
        {formatCompactNumber(transfer.quantity)}
      </TransferCell>

      {transfer.value && (
        <TransferCell
          title={transferColumns.value}
          className="col-span-2 md:col-span-1"
          unity="USD"
        >
          {formatCompactNumber(transfer.value)}
        </TransferCell>
      )}

      {transfer.price && (
        <TransferCell
          title={transferColumns.price}
          className="col-span-2 md:col-span-1"
          unity={`USD/${transfer.symbol}`}
        >
          {formatCompactNumber(transfer.price)}
        </TransferCell>
      )}
    </div>
  );
};

type TransferCellProps = React.HTMLAttributes<HTMLSpanElement> & {
  title?: string;
  unity?: string;
};

const TransferCell: React.FC<TransferCellProps> = ({
  children,
  className,
  title,
  unity,
}) => {
  return (
    <div className={transferCellVariants({ className })}>
      {title && (
        <span className={cellTitleVariants({ className: 'block md:hidden' })}>
          {title}
        </span>
      )}
      {children && (
        <span className="flex flex-col items-center justify-center flex-1 text-center">
          {children}
          {unity && (
            <span className="text-xs text-foreground/60 font-light">
              {unity}
            </span>
          )}
        </span>
      )}
    </div>
  );
};

const transferCellVariants = cva(
  'flex flex-col items-center justify-center gap-1'
);

const cellTitleVariants = cva(
  'text-center text-xs text-foreground/60 uppercase font-light'
);

const transferColumns = {
  name: 'Name',
  direction: 'Direction',
  quantity: 'Quantity',
  value: 'Value',
  price: 'Price',
};
