import { routes } from '@/config/routes';
import Link from 'next/link';
import { EmptyMessage, SectionHeader } from './shared';
import { buttonVariants } from '@/components/ui/button';

type InvalidAddressFragmentProps = {
  address: string;
};

export const InvalidAddressFragment: React.FC<InvalidAddressFragmentProps> = ({
  address,
}) => {
  return (
    <section className="flex flex-col items-center justify-center max-w-96 gap-4 mx-auto">
      <SectionHeader>Invalid Address</SectionHeader>
      <EmptyMessage>
        The value <b className="font-bold">{`"${address}"`}</b> is not a valid
        Ethereum address.
      </EmptyMessage>

      <Link href={routes.home()} className={buttonVariants()}>
        Return Home
      </Link>
    </section>
  );
};
