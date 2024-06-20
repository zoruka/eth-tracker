'use client';

import {
  createContext as createReactContext,
  useContext as useReactContext,
} from 'react';

export type CreateContextArgs = {
  hookName: string;
  providerName: string;
  name: string;
};

export type CreateContextReturn<T> = [
  React.Provider<T>,
  () => T,
  React.Context<T>
];

export const createContext = <T>({
  name,
  hookName,
  providerName,
}: CreateContextArgs): CreateContextReturn<T> => {
  const Context = createReactContext<T | undefined>(undefined);

  Context.displayName = name;

  const useContext = (): T => {
    const context = useReactContext(Context);

    if (!context) {
      const error = new Error(getErrorMessage(hookName, providerName));
      error.name = 'ContextError';
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  };

  return [Context.Provider, useContext, Context] as CreateContextReturn<T>;
};

const getErrorMessage = (hook: string, provider: string): string =>
  `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`;
