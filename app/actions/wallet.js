import { TRIGGER_WALLET_TOP_UP } from '../constants/wallet';

export function triggerWalletTopUp({ opened }) {
  return {
    type: TRIGGER_WALLET_TOP_UP,
    payload: { opened },
  };
}
