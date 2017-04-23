import { TRIGGER_WALLET_TOP_UP, TRIGGER_WALLET_CREATE_TRANSACTION } from '../constants/wallet';

export function triggerWalletTopUp({ opened }) {
  return {
    type: TRIGGER_WALLET_TOP_UP,
    payload: { opened },
  };
}

export function triggerWalletCreateTransaction({ opened }) {
  return {
    type: TRIGGER_WALLET_CREATE_TRANSACTION,
    payload: { opened },
  };
}
