import { MappedCisCountry } from '../../../../types';

/**
 * canGetAQuoteByEmail
 * Check if a country is able to get a quote by email
 * @param {MappedCisCountry} Mapped CIS Country
 * @returns {Boolean}
 */
export const canGetAQuoteByEmail = (country: MappedCisCountry) => {
  if (country.riskCategory && country.shortTermCover && !country.nbiIssueAvailable) {
    return true;
  }

  return false;
};

export default canGetAQuoteByEmail;
