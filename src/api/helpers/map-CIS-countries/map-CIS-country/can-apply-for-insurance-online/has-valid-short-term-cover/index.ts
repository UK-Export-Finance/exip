import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: {
    SHORT_TERM_COVER_AVAILABLE: { YES, REFER, UNLISTED },
  },
} = EXTERNAL_API_DEFINITIONS;

/**
 * hasValidShortTermCover
 * Check if a country's "short term cover" flag can apply for insurance online.
 * @param {String} shortTermCover: Short term cover
 * @returns {Boolean}
 */
const hasValidShortTermCover = (shortTermCover: string): boolean => {
  switch (shortTermCover) {
    case YES:
      return true;

    case REFER:
      return true;

    case UNLISTED:
      return true;

    default:
      return false;
  }
};

export default hasValidShortTermCover;
