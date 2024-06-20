import { Observability } from '../domain';

export const Logger = {
  log: (({ origin, data, key, level }) => {
    const timestamp = new Date().toISOString();
    const dataArray = Array.isArray(data) ? data : [data];

    // eslint-disable-next-line no-console
    console.log(
      `[${timestamp}][${level.toUpperCase()}]:[${origin}][${key}]:`,
      ...dataArray
    );

    return { origin, data, key, level, timestamp };
  }) satisfies Observability.LogFunction,
};
