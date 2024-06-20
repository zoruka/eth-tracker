'use client';

import { routes } from '@/config/routes';
import { ClientStorage } from '@/lib/client/client-storage';
import { formatAddress } from '@/lib/utils/format';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const RecentSearchesFragment: React.FC = () => {
  const [recentSearches, setRecentSearches] = useState<string[] | null>(null);

  useEffect(() => {
    setRecentSearches(ClientStorage.get('recent-searches'));
  }, []);

  if (!recentSearches) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 text-center mt-8 animate-fade-in">
      <h3 className="text-foreground/60 font-bold text-lg">
        Previously Searched
      </h3>

      <ul>
        {recentSearches.map((address) => (
          <li
            key={address}
            className="text-primary/60 hover:text-primary transitions underline"
          >
            <Link href={routes.address(address)}>{formatAddress(address)}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
