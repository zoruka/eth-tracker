import { HistoryClientPages } from './history-client-pages';
import { Suspense } from 'react';
import { getAccountHistory } from '@/lib/server/actions/get-account-history';
import { HistoryLog, HistoryLogFallback } from './history-log';
import { EmptyMessage, SectionHeader } from '../shared';

export type HistoryFragmentProps = {
  address: string;
};

export const HistoryFragment: React.FC<HistoryFragmentProps> = ({
  address,
}) => {
  return (
    <>
      <SectionHeader>History</SectionHeader>

      <ul className="flex flex-col gap-4">
        <Suspense fallback={<HistoryLogFallback />}>
          <ListContent address={address} />
        </Suspense>
      </ul>
    </>
  );
};

type ListContentProps = {
  address: string;
};

const ListContent: React.FC<ListContentProps> = async ({ address }) => {
  const result = await getAccountHistory({ address });

  if ('error' in result) {
    return <EmptyMessage>{result.error}</EmptyMessage>;
  }

  const { logs, cursor } = result;

  if (logs.length === 0) {
    return <EmptyMessage>There are no history logs</EmptyMessage>;
  }

  return (
    <>
      {logs.map((log) => (
        <HistoryLog key={log.hash} log={log} />
      ))}
      {cursor && <HistoryClientPages address={address} cursor={cursor} />}
    </>
  );
};
