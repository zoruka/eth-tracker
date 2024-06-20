import { secrets } from '@/config/secrets';
import { Logger } from '../util/logger';
import { IdentifiedError } from '../util/error';

export class EnsAdapter {
  private fetch: EnsAdapter.Fetch;

  constructor({ fetch: fetchParam }: EnsAdapter.Params = {}) {
    this.fetch = fetchParam || fetch;
  }

  reverseResolve = async (address: string): Promise<string[]> => {
    try {
      const response = await this.fetch(secrets.ens.subgraphUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query getDomainsForAccount {
              domains(where: { resolvedAddress: "${address.toLowerCase()}" }) {
                name
              }
            }
          `,
        }),
      });

      const json = await response.json();

      if (Array.isArray(json?.data?.domains)) {
        return json.data.domains.map((domain: { name: string }) => domain.name);
      }

      throw new IdentifiedError('Invalid response from ENS subgraph', {
        response: json,
      });
    } catch (error) {
      Logger.log({
        origin: 'core',
        key: 'EnsAdapter',
        level: 'error',
        data: error,
      });

      return [];
    }
  };
}

export namespace EnsAdapter {
  export type Params = {
    fetch?: Fetch;
  };

  export type Fetch = typeof fetch;
}
