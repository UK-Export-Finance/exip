/**
 * cannotGetAQuote
 * Check if a country cannot get a quote online or offline
 * @param {Boolean} shortTermCover: Short term cover flag.
 * @param {Boolean} nbiIssueAvailable: NBI flag.
 * @param {String} riskCategory: Country risk category.
 * @returns {Boolean}
 */
const cannotGetAQuote = (shortTermCover: boolean, nbiIssueAvailable: boolean, riskCategory?: string | null) => {
  if (!riskCategory || (!shortTermCover && !nbiIssueAvailable)) {
    return true;
  }

  return false;
};

export default cannotGetAQuote;
