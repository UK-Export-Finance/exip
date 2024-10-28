/**
 * canGetAQuoteOnline
 * Check if a country is able to get a quote online
 * @param {Boolean} shortTermCover: Short term cover flag.
 * @param {Boolean} nbiIssueAvailable: NBI flag.
 * @param {String} riskCategory: Country risk category.
 * @returns {Boolean}
 */
const canGetAQuoteOnline = (shortTermCover: boolean, nbiIssueAvailable: boolean, riskCategory?: string | null) => {
  if (riskCategory && shortTermCover && nbiIssueAvailable) {
    return true;
  }

  return false;
};

export default canGetAQuoteOnline;
