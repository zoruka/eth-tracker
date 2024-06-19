import { isRedirectError } from 'next/dist/client/components/redirect';

export const createSafeAction = <Params, Response>(
  action: Action<Params, Response>
): Action<Params, Response | ActionError> => {
  return async (params: Params) => {
    try {
      return await action(params);
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }

      if (error instanceof SafeActionError) {
        return { error: error.clientText };
      }

      // Logger.error({
      //   key: 'ServerAction',
      //   message: action.name,
      //   data: error,
      // });

      return { error: 'An unknown error happened' };
    }
  };
};

export type Action<Params, Response> = (params: Params) => Promise<Response>;

export type ActionError = { error: string };

export class SafeActionError extends Error {
  public clientText: string;

  constructor({ clientText }: { clientText: string }) {
    super('A recognized error happened');
    this.clientText = clientText;
  }
}
