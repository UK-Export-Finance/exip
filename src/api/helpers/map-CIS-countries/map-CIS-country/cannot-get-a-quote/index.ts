import { MappedCisCountry } from '../../../../types';

/**
 * cannotGetAQuote
 * Check if a country cannot get a quote online or offline
 * @param {MappedCisCountry} Country from CIS API
 * @returns {Boolean}
 */
export const cannotGetAQuote = (country: MappedCisCountry) => {
  if (!country.riskCategory || (!country.shortTermCover && !country.nbiIssueAvailable)) {
    return true;
  }

  return false;
};

export default cannotGetAQuote;
