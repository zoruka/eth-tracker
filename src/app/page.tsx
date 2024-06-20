import { Logo } from '@/components/layout/logo';
import { FormFragment } from './_fragments/form';
import { RecentSearchesFragment } from './_fragments/recent-searches';

export default function Home() {
  return (
    <>
      <div className="flex flex-col max-w-[30rem] w-full gap-8 mt-8 mx-auto px-2">
        <h1 className="text-3xl text-center font-bold">
          Let&apos;s Get Started!
        </h1>
        <p className="text-lg text-center font-thin [&>b]:text-primary mb-8">
          Use <b>EthTracker</b> to check <b>balances</b> and&nbsp;
          <b>history of transactions</b> of an Ethereum address
        </p>

        <FormFragment />
        <RecentSearchesFragment />
      </div>
    </>
  );
}
