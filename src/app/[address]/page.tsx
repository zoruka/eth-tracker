import { BalancesFragment } from './_fragments/balances';
import { HistoryFragment } from './_fragments/history';
import { HeroFragment } from './_fragments/hero';
import { getAccountMetadata } from '@/lib/server/actions/get-account-metadata';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { formatAddress } from '@/lib/utils/format';
import { site } from '@/config/site';
import { RecentSearchesUpdaterFragment } from './_fragments/recent-searches-updater';

export type AddressPageProps = {
  params: {
    address: string;
  };
};

export const generateMetadata = ({ params }: AddressPageProps): Metadata => {
  let { address } = params;

  return {
    title: `${site.name} (${formatAddress(address)})`,
  };
};

export default async function AddressPage({ params }: AddressPageProps) {
  let { address } = params;

  const metadata = await getAccountMetadata(address);

  if ('error' in metadata) {
    return redirect('/');
  }

  return (
    <>
      <HeroFragment metadata={metadata} />
      <BalancesFragment address={address} />
      <HistoryFragment address={address} />
      <RecentSearchesUpdaterFragment address={address} />
    </>
  );
}
