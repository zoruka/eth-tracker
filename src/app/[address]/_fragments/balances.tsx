import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import type { Domain } from '@/lib/core';
import { getAccountBalance } from '@/lib/server/actions/get-account-balance';
import { formatCompactNumber } from '@/lib/utils/format';
import { cva } from 'class-variance-authority';
import { Suspense } from 'react';
import { EmptyMessage, SectionHeader } from './shared';

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

  return balances.map((balance, index) => (
    <BalanceBadge key={index} balance={balance} />
  ));
};

type BalanceBadgeProps = {
  balance: Domain.Account.Balance;
};

const BalanceBadge: React.FC<BalanceBadgeProps> = ({ balance }) => {
  return (
    <div className={balanceBadgeContainerVariants()}>
      <Avatar
        src={balance.iconUrl}
        alt={balance.name}
        fallbackIcon="coin"
        size="sm"
      />
      <span className="text-nowrap max-w-[10rem] text-ellipsis overflow-hidden">
        {formatCompactNumber(balance.quantity)}{' '}
        <span className="text-foreground/60 font-light">{balance.symbol}</span>
      </span>
    </div>
  );
};

const BalancesFallback: React.FC = () => {
  return new Array(5).fill(null).map((_, index) => (
    <div key={index} className={balanceBadgeContainerVariants()}>
      <Skeleton className="w-6 h-6 rounded-full" />
      <Skeleton className="w-20 h-6" />
    </div>
  ));
};

const balanceBadgeContainerVariants = cva(
  'flex items-center rounded-full border px-2 py-1 gap-2 bg-secondary'
);
