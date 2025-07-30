import { SYMBOLS } from '../../constants/supported-currencies';
import { Currency } from '../../../types';

/**
 * getCurrencyByCode
 * Get a currency by ISO code
 * @param {Array} Currencies
 * @param {string} Currency ISO code
 * @returns {object} Currency
 */
const getCurrencyByCode = (currencies: Array<Currency>, isoCode: string) => {
  const currency = currencies.find((c) => c.isoCode === isoCode);

  const symbol = SYMBOLS[isoCode];

  return {
    isoCode: currency?.isoCode,
    name: currency?.name,
    symbol,
  };
};

export default getCurrencyByCode;
