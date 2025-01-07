import { MapCisCountryParams } from '../../../../types';

/**
 * cannotGetAQuote
 * Check if a country cannot get a quote online or offline
 * @param {MapCisCountryParams}
 * @param {Boolean} shortTermCover: Short term cover flag.
 * @param {Boolean} nbiIssueAvailable: NBI flag.
 * @param {String} esraClassification: ESRA classification.
 * @returns {Boolean}
 */
const cannotGetAQuote = ({ shortTermCover, nbiIssueAvailable, esraClassification }: MapCisCountryParams) => {
  if (!esraClassification || (!shortTermCover && !nbiIssueAvailable)) {
    return true;
  }

  return false;
};

export default cannotGetAQuote;
