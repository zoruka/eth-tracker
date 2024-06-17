import { Account } from '@/lib/core/domain';

export type BalancesFragmentProps = {
  balances: Account.Balance[];
};

export const BalancesFragment: React.FC<BalancesFragmentProps> = ({
  balances,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {balances.map((balance, index) => (
        <BalanceBadge key={index} balance={balance} />
      ))}
    </div>
  );
};

type BalanceBadgeProps = {
  balance: Account.Balance;
};

const BalanceBadge: React.FC<BalanceBadgeProps> = ({ balance }) => {
  return (
    <div className="flex items-center rounded-full border px-2 py-1">
      {/* TODO: create avatar component */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={balance.iconUrl} alt={balance.name} className="w-6 h-6 mr-2" />
      <span className="text-sm">
        {balance.quantity} {balance.symbol}
      </span>
    </div>
  );
};
