import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import type { Domain } from '@/lib/core';
import { getAccountBalance } from '@/lib/server/actions/get-account-balance';
import { formatCompactNumber } from '@/lib/utils/format';
import { cva } from 'class-variance-authority';
import { Suspense } from 'react';
import { EmptyMessage, SectionHeader } from './shared';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { parseNetworkId } from '@/lib/utils/parse-network-id';

export type BalancesFragmentProps = {
  address: string;
};

export const BalancesFragment: React.FC<BalancesFragmentProps> = ({
  address,
}) => {
  return (
    <>
      <SectionHeader>Balances</SectionHeader>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Suspense fallback={<BalancesFallback />}>
          <BalancesListItems address={address} />
        </Suspense>
      </div>
    </>
  );
};

type BalancesListItemsProps = {
  address: string;
};

const BalancesListItems: React.FC<BalancesListItemsProps> = async ({
  address,
}) => {
  const balances = await getAccountBalance(address);

  if ('error' in balances) {
    return <EmptyMessage>{balances.error}</EmptyMessage>;
  }

  if (balances.length === 0) {
    return <EmptyMessage>There are no balances</EmptyMessage>;
  }

  const showingBalances = balances.slice(0, 8);
  const remainingBalances = balances.slice(8);

  return (
    <>
      {showingBalances.map((balance, index) => (
        <BalanceBadge key={index} balance={balance} />
      ))}
      {remainingBalances.length > 0 && (
        <Collapsible className="w-full">
          <CollapsibleTrigger className="w-full rounded-md">
            {`Show ${remainingBalances.length} more`}
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-wrap items-center justify-center gap-2 border-none mt-2">
            {remainingBalances.map((balance, index) => (
              <BalanceBadge key={index} balance={balance} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </>
  );
};

type BalanceBadgeProps = {
  balance: Domain.Account.Balance;
};

const BalanceBadge: React.FC<BalanceBadgeProps> = ({ balance }) => {
  const network = parseNetworkId(balance.chainId);

  return (
    <div className={balanceBadgeContainerVariants()}>
      <div className="relative">
        <Avatar
          src={balance.iconUrl}
          alt={balance.name}
          fallbackIcon="coin"
          size="sm"
        />
        <Avatar
          src={network?.iconUrl}
          alt={network?.name || 'unknown network'}
          fallbackIcon="network"
          size="xs"
          className="absolute bottom-0 -right-1 ring ring-border ring-1 w-3 h-3 bg-background"
        />
      </div>
      <span className="text-nowrap max-w-[10rem] text-ellipsis overflow-hidden">
        {formatCompactNumber(balance.quantity)}{' '}
        <span className="text-foreground/60 font-light">{balance.symbol}</span>
      </span>
    </div>
  );
};

const BalancesFallback: React.FC = () => {
  return new Array(8).fill(null).map((_, index) => (
    <div
      key={index}
      className={balanceBadgeContainerVariants()}
      style={{ width: `${Math.random() * 9 + 6}rem` }}
    >
      <Skeleton className="w-6 h-6 rounded-full" />
      <Skeleton className="flex-1 h-6" />
    </div>
  ));
};

const balanceBadgeContainerVariants = cva(
  'flex items-center rounded-full border px-2 py-1 gap-2 bg-secondary'
);
