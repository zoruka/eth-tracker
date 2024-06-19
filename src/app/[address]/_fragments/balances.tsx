import { Avatar } from '@/components/ui/avatar';
import type { Domain } from '@/lib/core';
import { formatCompactNumber } from '@/lib/utils/format';

export type BalancesFragmentProps = {
  balances: Domain.Account.Balance[];
};

export const BalancesFragment: React.FC<BalancesFragmentProps> = ({
  balances,
}) => {
  return (
    <>
      <h1 className="text-xl text-center font-bold m-8">Balances</h1>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {balances.map((balance, index) => (
          <BalanceBadge key={index} balance={balance} />
        ))}
      </div>
    </>
  );
};

type BalanceBadgeProps = {
  balance: Domain.Account.Balance;
};

const BalanceBadge: React.FC<BalanceBadgeProps> = ({ balance }) => {
  return (
    <div className="flex items-center rounded-full border px-2 py-1 gap-2 bg-secondary">
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
