export namespace Observability {
  export type Log = {
    origin: 'core' | 'server' | 'client';
    level: 'info' | 'warn' | 'error';
    key: string;
    data: any;
    timestamp: string;
  };

  export type LogFunction = (params: Omit<Log, 'timestamp'>) => Log;
}
