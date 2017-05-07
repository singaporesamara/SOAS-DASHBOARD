import { TOP_UP_BY_GIRO } from './constants';

export function topUpByGIRO({ bankAccountNumber, bankName, branchCode, amount }) {
  return {
    type: TOP_UP_BY_GIRO,
    payload: { bankAccountNumber, bankName, branchCode, amount },
  };
}
