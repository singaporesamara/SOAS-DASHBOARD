import { CREATE_TRANSACTION } from './constants';

export function createTransaction({ emailOrUEN, amount, purpose, description }) {
  return {
    type: CREATE_TRANSACTION,
    payload: { emailOrUEN, amount, purpose, description },
  };
}
