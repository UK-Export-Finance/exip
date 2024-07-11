import { SUPPORTED_CURRENCIES } from '../../../../constants';

/**
 * isNotAlternativeCurrency
 * checks if provided currency is not an alternative currency
 * returns the currency if not alternative currency or undefined if not supported
 * @param {String} currency
 * @returns {String} currency or undefined
 */
const isNotAlternativeCurrency = (currency?: string) => SUPPORTED_CURRENCIES.find((currencyCode: string) => currencyCode === currency);

export default isNotAlternativeCurrency;
