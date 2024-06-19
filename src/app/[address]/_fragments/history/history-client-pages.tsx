'use client';

import {
  GetAccountHistory,
  getAccountHistory,
} from '@/lib/server/actions/get-account-history';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  HistoryLog,
  HistoryLogFallback,
  HistoryLogMessage,
} from './history-log';

export type HistoryClientPagesProps = {
  address: string;
  cursor: string;
};

export const HistoryClientPages: React.FC<HistoryClientPagesProps> = ({
  cursor,
  address,
}) => {
  const [result, setResult] = useState<GetAccountHistory.Result>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const triggerRef = useRef<HTMLSpanElement>(null);

  const handleLoadMore = useCallback(async () => {
    try {
      setLoading(true);
      const newResult = await getAccountHistory({ address, cursor });

      if ('error' in newResult) {
        throw newResult.error;
      }

      setResult(newResult);
    } catch (error) {
      setError('It was not possible to load more history logs');
    } finally {
      setLoading(false);
    }
  }, [address, cursor]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          await handleLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleLoadMore]);

  if (loading) {
    return <HistoryLogFallback />;
  }

  if (error) {
    return <HistoryLogMessage message={error} />;
  }

  if (!result) {
    return <span ref={triggerRef} />;
  }

  return (
    <>
      {result.logs.map((log) => (
        <HistoryLog key={log.hash} log={log} />
      ))}
      {result.cursor && (
        <HistoryClientPages address={address} cursor={result.cursor} />
      )}
    </>
  );
};
