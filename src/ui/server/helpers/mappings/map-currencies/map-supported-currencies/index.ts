import { SUPPORTED_CURRENCIES } from '../../../../constants';
import { Currency } from '../../../../../types';

/**
 * mapSupportedCurrencies
 * Filter  supported currencies
 * @param {Array} Array of all possible currencies
 * @returns {Array} Array of currencies that EXIP supports
 */
const mapSupportedCurrencies = (currencies: Array<Currency>) => {
  const supported = currencies.filter((currency) => SUPPORTED_CURRENCIES.find((currencyCode: string) => currency.isoCode === currencyCode));

  return supported;
};

export default mapSupportedCurrencies;
