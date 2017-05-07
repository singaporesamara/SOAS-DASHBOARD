import { CREATE_TRANSACTION, TRANSACTION_FINISHED, BACK_TO_FORM } from './constants';

export function createTransaction({ companyUEN, bankName, branchCode, bankAccountNumber, purpose, description, amount }) {
  return {
    type: CREATE_TRANSACTION,
    payload: { companyUEN, bankName, branchCode, bankAccountNumber, purpose, description, amount },
  };
}

export function transactionFinished(status) {
  return {
    type: TRANSACTION_FINISHED,
    payload: { status },
  };
}

export function backToForm() {
  return {
    type: BACK_TO_FORM,
  };
}
