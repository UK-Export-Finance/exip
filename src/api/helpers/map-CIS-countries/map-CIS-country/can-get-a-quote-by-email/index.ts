/**
 * canGetAQuoteByEmail
 * Check if a country is able to get a quote by email
 * @param {Boolean} shortTermCover: Short term cover flag.
 * @param {Boolean} nbiIssueAvailable: NBI flag.
 * @param {String} riskCategory: Country risk category.
 * @returns {Boolean}
 */
const canGetAQuoteByEmail = (shortTermCover: boolean, nbiIssueAvailable: boolean, riskCategory?: string | null) => {
  if (shortTermCover && !nbiIssueAvailable && riskCategory) {
    return true;
  }

  return false;
};

export default canGetAQuoteByEmail;
