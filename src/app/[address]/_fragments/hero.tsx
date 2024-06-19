import { Icon } from '@/components/icon';
import { WithLabel } from '@/components/ui/with-label';
import type { Domain } from '@/lib/core';
import { formatAddress } from '@/lib/utils/format';

export type HeroFragmentProps = {
  metadata: Domain.Account.Metadata;
};

export const HeroFragment: React.FC<HeroFragmentProps> = ({ metadata }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex justify-center items-center w-16 h-16 rounded-full bg-primary text-4xl text-primary-foreground">
        <Icon name={metadata.type} />
      </div>
      <h1 className="text-2xl text-center">
        {formatAddress(metadata.address)}
      </h1>

      {metadata.names.length > 0 && (
        <WithLabel label="AKA">
          <div className="flex flex-row gap-1 leading-3">
            {metadata.names.join(', ')}
          </div>
        </WithLabel>
      )}
    </div>
  );
};
