import { HistoryClientPages } from './history-client-pages';
import { Suspense } from 'react';
import { getAccountHistory } from '@/lib/server/actions/get-account-history';
import {
  HistoryLog,
  HistoryLogFallback,
  HistoryLogMessage,
} from './history-log';

export type HistoryFragmentProps = {
  address: string;
};

export const HistoryFragment: React.FC<HistoryFragmentProps> = ({
  address,
}) => {
  return (
    <>
      <h1 className="text-xl text-center font-bold m-8">History</h1>
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
    return <HistoryLogMessage message={result.error} />;
  }

  const { logs, cursor } = result;

  return (
    <>
      {logs.map((log) => (
        <HistoryLog key={log.hash} log={log} />
      ))}
      {cursor && <HistoryClientPages address={address} cursor={cursor} />}
    </>
  );
};
