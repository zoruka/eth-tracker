import { getAddressData } from '@/lib/server/get-address-data';
import { BalancesFragment } from './_fragments/balances';
import { HistoryFragment } from './_fragments/history';

export type AddressPageProps = {
  params: {
    address: string;
  };
};

export default async function AddressPage({ params }: AddressPageProps) {
  let { address } = params;

  const data = await getAddressData(address);

  return (
    <>
      <BalancesFragment balances={data.balance} />
      <HistoryFragment history={data.history} />
    </>
  );
}
