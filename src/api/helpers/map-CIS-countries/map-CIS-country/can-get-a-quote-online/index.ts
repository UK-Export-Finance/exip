import { MappedCisCountry } from '../../../../types';

/**
 * canGetAQuoteOnline
 * Check if a country is able to get a quote online
 * @param {Object} Country from CIS API
 * @returns {Boolean}
 */
export const canGetAQuoteOnline = (country: MappedCisCountry) => {
  if (country.riskCategory && country.shortTermCover && country.nbiIssueAvailable) {
    return true;
  }

  return false;
};

export default canGetAQuoteOnline;
