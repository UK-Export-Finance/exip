import { CisCountry, Currency } from '../../types';

/**
 * filterCisEntries
 * Filter out countries or currencies from CIS API response that have an invalid name,
 * that is not relevant or appropriate for an EXIP.
 * E.g, "Gold" currency, "EC Market n/k" country.
 * @param {Array<CisCountry> | Array<Currency>} All CIS countries or currencies
 * @returns {Array} CIS countries/currencies without invalid entries.
 */
const filterCisEntries = (arr: Array<CisCountry> | Array<Currency>, invalidEntries: Array<string>, entityPropertyName: string) => {
  const filtered = arr.filter((obj) => !invalidEntries.includes(obj[entityPropertyName]));

  return filtered;
};

export default filterCisEntries;
