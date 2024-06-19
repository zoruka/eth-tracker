import { networks } from '@/lib/core/constants/networks';
import { Badge } from '@/components/ui/badge';
import { Network } from '@/lib/core/domain/network';
import { formatAddress } from '@/lib/utils/format';
import { Icon } from '@/components/icon';
import { WithLabel } from '@/components/ui/with-label';
import { Domain } from '@/lib/core';
import { Collapsible } from '@/components/ui/collapsible';
import { Account } from '@/lib/core/domain';
import { cva } from 'class-variance-authority';

export type HistoryLogProps = {
  log: Domain.Account.HistoryLog;
};

export const HistoryLog: React.FC<HistoryLogProps> = ({ log }) => {
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
        <Transfers log={log} />
      ) : (
        <HistoryLogMessage message=" There are no transfers for this transaction" />
      )}
    </li>
  );
};

export const HistoryLogFallback: React.FC = () => {
  return new Array(3).fill(0).map((_, index) => (
    <li key={index} className="w-full h-[15.1875rem] bg-secondary border">
      loading...
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

type TransfersProps = {
  log: Account.HistoryLog;
};

const Transfers: React.FC<TransfersProps> = ({ log }) => {
  return (
    <Collapsible trigger="Transfers">
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
