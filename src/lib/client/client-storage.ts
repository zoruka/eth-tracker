import { isServer } from '../utils/is-server';

export const ClientStorage = {
  set<Key extends ClientStorage.Keys>(
    key: Key,
    value: ClientStorage.Values[Key]
  ) {
    if (isServer()) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  },

  get<Key extends ClientStorage.Keys>(
    key: Key
  ): ClientStorage.Values[Key] | null {
    if (isServer()) {
      return null;
    }

    const value = localStorage.getItem(key);
    if (value === null) {
      return null;
    }

    return JSON.parse(value);
  },

  delete<Key extends ClientStorage.Keys>(key: Key) {
    if (isServer()) {
      return;
    }

    localStorage.removeItem(key);
  },
};

export namespace ClientStorage {
  export type Values = {
    'recent-searches': string[];
  };

  export type Keys = keyof Values;
}
