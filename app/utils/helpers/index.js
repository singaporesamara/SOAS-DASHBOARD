import accounting from 'accounting';

export function toMoneyString(amount, postfix = 'SGD') {
  return `${accounting.formatMoney(amount, '', 0, ' ')} ${postfix}`;
}
