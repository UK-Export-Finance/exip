import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const { CIS } = EXTERNAL_API_DEFINITIONS;

/**
 * canApplyOffline
 * Check if a country can get a quote offline
 * @param {String} Country original short term cover definition from CIS API.
 * @returns {Boolean}
 */
export const canApplyOffline = (originalShortTermCover: string) => {
  if (originalShortTermCover === CIS.SHORT_TERM_COVER_AVAILABLE.ILC) {
    return true;
  }

  if (originalShortTermCover === CIS.SHORT_TERM_COVER_AVAILABLE.CILC) {
    return true;
  }

  if (originalShortTermCover === CIS.SHORT_TERM_COVER_AVAILABLE.REFER) {
    return true;
  }

  return false;
};

export default canApplyOffline;
