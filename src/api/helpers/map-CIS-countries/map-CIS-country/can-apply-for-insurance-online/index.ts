/**
 * canApplyForInsuranceOnline
 * Check if a country can apply for insurance online.
 * A country can apply if
 * 1) The country has a risk category,
 * 2) The country has a short term cover definition with one of the following values:
 * - Yes
 * - ILC
 * - CILC
 * - Refer
 * - Unlisted
 * @param {Boolean} shortTermCover: Short term cover flag.
 * @param {String} esraClassification: ESRA classification.
 * @returns {Boolean}
 */
const canApplyForInsuranceOnline = (shortTermCover: boolean, esraClassification?: string | null) => {
  if (shortTermCover && esraClassification) {
    return true;
  }

  return false;
};

export default canApplyForInsuranceOnline;
