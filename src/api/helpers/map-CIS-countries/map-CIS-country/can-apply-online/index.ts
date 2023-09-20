import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const { CIS } = EXTERNAL_API_DEFINITIONS;

/**
 * canApplyOnline
 * Check if a country can apply online
 * @param {String} Country original short term cover definition from CIS API.
 * @returns {Boolean}
 */
export const canApplyOnline = (originalShortTermCover: string) => {
  if (originalShortTermCover === CIS.SHORT_TERM_COVER_AVAILABLE.YES) {
    return true;
  }

  return false;
};

export default canApplyOnline;
