import { BalancesFragment } from './_fragments/balances';
import { HistoryFragment } from './_fragments/history';
import { HeroFragment } from './_fragments/hero';
import { getAccountMetadata } from '@/lib/server/actions/get-account-metadata';
import { getAccountBalance } from '@/lib/server/actions/get-account-balance';
import { getAccountHistory } from '@/lib/server/actions/get-account-history';

export type AddressPageProps = {
  params: {
    address: string;
  };
};

export default async function AddressPage({ params }: AddressPageProps) {
  let { address } = params;

  const metadata = await getAccountMetadata(address);
  const balance = await getAccountBalance(address);

  return (
    <>
      <HeroFragment metadata={metadata as any} />
      <BalancesFragment balances={balance as any} />
      <HistoryFragment address={address} />
    </>
  );
}
