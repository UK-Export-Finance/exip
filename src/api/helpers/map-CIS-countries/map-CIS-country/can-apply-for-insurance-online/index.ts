import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: {
    SHORT_TERM_COVER_AVAILABLE: { YES, ILC, CILC, REFER, UNLISTED },
  },
} = EXTERNAL_API_DEFINITIONS;

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
 * @param {String} originalShortTermCover: Country original short term cover definition from CIS API.
 * @param {String} riskCategory: Country risk category.
 * @returns {Boolean}
 */
export const canApplyForInsuranceOnline = (originalShortTermCover: string, riskCategory?: string) => {
  switch (originalShortTermCover) {
    case riskCategory && YES:
      return true;

    case riskCategory && ILC:
      return true;

    case riskCategory && CILC:
      return true;

    case riskCategory && REFER:
      return true;

    case riskCategory && UNLISTED:
      return true;

    default:
      return false;
  }
};

export default canApplyForInsuranceOnline;
