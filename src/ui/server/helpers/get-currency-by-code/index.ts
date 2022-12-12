import { Currency } from '../../../types';

/**
 * getCurrencyByCode
 * Get a currency by ISO code
 * @param {Array} Currencies
 * @param {String} Currency ISO code
 * @returns {Object} Currency
 */
const getCurrencyByCode = (currencies: Array<Currency>, isoCode: string) => {
  const currency = currencies.find((c) => c.isoCode === isoCode);

  return {
    isoCode: currency?.isoCode,
    name: currency?.name,
  };
};

export default getCurrencyByCode;
