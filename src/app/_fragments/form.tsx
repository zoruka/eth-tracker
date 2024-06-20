'use client';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { routes } from '@/config/routes';
import { validators } from '@/lib/utils/validators';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export const FormFragment: React.FC = () => {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const enableSearch = useMemo(() => validators.isAddress(address), [address]);

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> &
    React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!enableSearch) return;
    setLoading(true);
    router.push(routes.address(address));
  };

  return (
    <form
      className="flex flex-col md:flex-row w-full max-w-[26rem] gap-2 mx-auto"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="0xabc12..."
        value={address}
        onChange={handleAddressChange}
        className="w-full md:w-96"
        autoFocus
        name="eth-address"
      />
      <Button
        disabled={!enableSearch}
        type="submit"
        loading={loading}
        className="w-full md:w-32"
      >
        Track
        <Icon name="magnify" />
      </Button>
    </form>
  );
};
