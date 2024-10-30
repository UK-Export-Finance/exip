import { MapCisCountryParams } from '../../../../types';

/**
 * canGetAQuoteOnline
 * Check if a country is able to get a quote online
 * @param {MapCisCountryParams}
 * @param {Boolean} shortTermCover: Short term cover flag.
 * @param {Boolean} nbiIssueAvailable: NBI flag.
 * @param {String} esraClassification: ESRA classification.
 * @returns {Boolean}
 */
const canGetAQuoteOnline = ({ shortTermCover, nbiIssueAvailable, esraClassification }: MapCisCountryParams) => {
  if (esraClassification && shortTermCover && nbiIssueAvailable) {
    return true;
  }

  return false;
};

export default canGetAQuoteOnline;
