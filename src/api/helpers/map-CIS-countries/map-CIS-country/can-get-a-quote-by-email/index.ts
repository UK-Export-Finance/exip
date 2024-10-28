import { MapCisCountryParams } from '../../../../types';

/**
 * canGetAQuoteByEmail
 * Check if a country is able to get a quote by email
 * @param {MapCisCountryParams}
 * @param {Boolean} shortTermCover: Short term cover flag.
 * @param {Boolean} nbiIssueAvailable: NBI flag.
 * @param {String} riskCategory: Country risk category.
 * @returns {Boolean}
 */
const canGetAQuoteByEmail = ({ shortTermCover, nbiIssueAvailable, riskCategory }: MapCisCountryParams) => {
  if (shortTermCover && !nbiIssueAvailable && riskCategory) {
    return true;
  }

  return false;
};

export default canGetAQuoteByEmail;
