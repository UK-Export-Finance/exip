import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const { CIS } = EXTERNAL_API_DEFINITIONS;

/**
 * canApplyForAQuoteOffline
 * Check if a country can get a quote offline
 * @param {String} Country original short term cover definition from CIS API.
 * @returns {Boolean}
 */
export const canApplyForAQuoteOffline = (originalShortTermCover: string) => {
  if (originalShortTermCover === CIS.SHORT_TERM_COVER.ILC) {
    return true;
  }

  if (originalShortTermCover === CIS.SHORT_TERM_COVER.CILC) {
    return true;
  }

  if (originalShortTermCover === CIS.SHORT_TERM_COVER.REFER) {
    return true;
  }

  return false;
};

export default canApplyForAQuoteOffline;
