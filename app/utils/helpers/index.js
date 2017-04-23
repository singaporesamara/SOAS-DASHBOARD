import accounting from 'accounting';

export function toMoneyString(amount, withSign = false, postfix = 'SGD') {
  const sign = withSign && amount > 0 ? '+' : '';
  return `${sign}${accounting.formatMoney(amount, '', 0, ' ')} ${postfix}`;
}
