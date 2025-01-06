import { MapCisCountryParams } from '../../../../types';

/**
 * canGetAQuoteByEmail
 * Check if a country is able to get a quote by email
 * @param {MapCisCountryParams}
 * @param {Boolean} shortTermCover: Short term cover flag.
 * @param {Boolean} nbiIssueAvailable: NBI flag.
 * @param {String} esraClassification: ESRA classification.
 * @returns {Boolean}
 */
const canGetAQuoteByEmail = ({ shortTermCover, nbiIssueAvailable, esraClassification }: MapCisCountryParams) => {
  if (shortTermCover && !nbiIssueAvailable && esraClassification) {
    return true;
  }

  return false;
};

export default canGetAQuoteByEmail;
