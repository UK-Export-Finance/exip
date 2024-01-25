import { SUPPORTED_CURRENCIES } from '../../../../constants';

/**
 * isSupportedCurrency
 * checks if provided currency is provided or not
 * returns the currency if supportedCurrency or undefined if not supported
 * @param {String} currency
 * @returns {String} currency or undefined
 */
const isNotAlternativeCurrency = (currency?: string) => SUPPORTED_CURRENCIES.find((currencyCode: string) => currencyCode === currency);

export default isNotAlternativeCurrency;
