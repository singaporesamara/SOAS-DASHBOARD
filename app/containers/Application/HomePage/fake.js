import { TYPES } from '../../../constants/events';

export const FAKE_EVENTS = [
  { type: TYPES.TRANSACTION, date: '20.04.2017', title: 'Google PTE LTD', description: 'Payment for accounting service May 2017', amount: 2000, source: 'eWallet' },
  { type: TYPES.SYSTEM, date: '20.04.2017', title: 'System Notification', description: 'Hi. We update our sistem and start use new <a href="/" className="link -blue -underline">Terms and Conditions</a>' },
  { type: TYPES.TRANSACTION, date: '20.04.2017', title: 'SOAS PTE LTD', description: 'Monthly subscription for secretary service', amount: 21000, source: 'GIRO' },
  { type: TYPES.TRANSACTION, date: '20.04.2017', title: 'SOAS PTE LTD', description: 'Invoice for monthy Subscription', amount: -2000, source: 'Bank Transfer' },
  { type: TYPES.INVOICE, date: '20.04.2017', title: 'Square PTE LTD', description: 'New income invoice' },
  { type: TYPES.TRANSACTION, date: '20.04.2017', title: 'Top up account', description: 'Top up from Master Card **** 6521', amount: 22000, source: 'Credit Card' },
];
