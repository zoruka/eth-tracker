type CacheRecord = {
  value: any;
  expire: number | null;
};

const cacheRecords = new Map<string, CacheRecord>();

export const cacheRequest = async <T>(
  key: string,
  callback: () => Promise<T>,
  expire: number | null = null
): Promise<T> => {
  const record = cacheRecords.get(key);

  if (record && (record.expire === null || record.expire > Date.now())) {
    return record.value;
  }

  const value = await callback();
  cacheRecords.set(key, { value, expire: expire ? Date.now() + expire : null });

  return value;
};
