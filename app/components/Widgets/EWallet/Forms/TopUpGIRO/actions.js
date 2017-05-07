import { TOP_UP_BY_GIRO, BACK_TO_FORM, TRANSACTION_FINISHED } from './constants';

export function topUpByGIRO({ bankAccountNumber, bankName, branchCode, amount }) {
  return {
    type: TOP_UP_BY_GIRO,
    payload: { bankAccountNumber, bankName, branchCode, amount },
  };
}

export function backToForm() {
  return {
    type: BACK_TO_FORM,
  };
}

export function transactionFinished(status) {
  return {
    type: TRANSACTION_FINISHED,
    payload: { status },
  };
}
