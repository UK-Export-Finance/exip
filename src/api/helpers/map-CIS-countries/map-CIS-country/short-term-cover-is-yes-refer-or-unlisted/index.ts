import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: {
    SHORT_TERM_COVER: { YES, REFER, UNLISTED },
  },
} = EXTERNAL_API_DEFINITIONS;

/**
 * shortTermCoverIsYesReferOrUnlisted
 * Check if a country's "short term cover" flag can apply for insurance online.
 * @param {string} shortTermCover: Short term cover
 * @returns {boolean}
 */
const shortTermCoverIsYesReferOrUnlisted = (shortTermCover: string): boolean => {
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

export default shortTermCoverIsYesReferOrUnlisted;
