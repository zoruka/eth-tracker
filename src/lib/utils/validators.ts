import { isAddress } from 'viem';

export const validators = {
  isAddress,
} satisfies Record<string, Validator>;

type Validator = (value: string) => boolean;
