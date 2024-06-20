'use client';

import { ClientStorage } from '@/lib/client/client-storage';
import { useEffect } from 'react';

export type RecentSearchesUpdaterFragmentProps = {
  address: string;
};

export const RecentSearchesUpdaterFragment: React.FC<
  RecentSearchesUpdaterFragmentProps
> = ({ address }) => {
  useEffect(() => {
    const parsedAddress = address.toLowerCase();
    let recentSearches = ClientStorage.get('recent-searches') || [];
    recentSearches = recentSearches.filter(
      (search) => search !== parsedAddress
    );
    recentSearches.unshift(parsedAddress);
    recentSearches = recentSearches.slice(0, 5);
    ClientStorage.set('recent-searches', recentSearches);
  }, [address]);

  return null;
};
