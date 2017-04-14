import { forIn, map, range } from 'lodash';

const getCardType = (number) => {
  const cards = { visa: /^4/, mastercard: /^5[1-5]/, amex: /^3[47]/, diners: /^3(?:0[0-5]|[68][0-9])/, discover: /^6(?:011|5[0-9]{2})/, jcb: /^(?:2131|1800|35\d{3})/ };
  let type = null;
  forIn(cards, (value, key) => {
    if (cards[key].test(number)) {
      type = key;
    }
  });
  return type;
};

const mobilePhoneMask = ['+', '6', '5', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

const creditCardMask = (rawValue) => {
  const cardType = getCardType(rawValue);
  let mask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  if (cardType === 'amex') {
    mask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/];
  } else if (cardType === 'diners') {
    mask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/];
  }

  return mask;
};

const cvcMask = [/\d/, /\d/, /\d/, /\d/];

const digitsMask = (rawValue) => map(range((rawValue || '').length + 1), () => /\d/);

const expirationMonthAndYearMask = [/[0-1]/, /\d/, '/', /[1-2]/, /\d/, /\d/, /\d/];

const expirationMonthAndShortYearMask = [/[0-1]/, /\d/, '/', /\d/, /\d/];

const promoCodeMask = [/./, /./, /./, /./, '-', /./, /./, /./, /./, '-', /./, /./, /./, /./, '-', /./, /./, /./, /./];

export function prepareMask(initialMask) {
  if (initialMask === 'mobilePhone') return mobilePhoneMask;
  if (initialMask === 'creditCard') return creditCardMask;
  if (initialMask === 'cvc') return cvcMask;
  if (initialMask === 'digits') return digitsMask;
  if (initialMask === 'expirationDate') return expirationMonthAndYearMask;
  if (initialMask === 'expirationDateShortYear') return expirationMonthAndShortYearMask;
  if (initialMask === 'promoCode') return promoCodeMask;
  return initialMask;
}
