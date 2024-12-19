import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: {
    SHORT_TERM_COVER: { ILC, CILC, REFER },
  },
} = EXTERNAL_API_DEFINITIONS;

/**
 * canApplyForAQuoteOffline
 * Check if a country can get a quote offline
 * @param {String} Country original short term cover definition from CIS API.
 * @returns {Boolean}
 */
export const canApplyForAQuoteOffline = (originalShortTermCover: string) => {
  if (originalShortTermCover === ILC) {
    return true;
  }

  if (originalShortTermCover === CILC) {
    return true;
  }

  if (originalShortTermCover === REFER) {
    return true;
  }

  return false;
};

export default canApplyForAQuoteOffline;
