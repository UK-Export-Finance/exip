import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: { SHORT_TERM_COVER },
} = EXTERNAL_API_DEFINITIONS;

/**
 * mapShortTermCoverAvailable
 * Transform a countries 'short term cover available' string to a boolean
 * @param {String} Risk category
 * @returns {Boolean}
 */
const mapShortTermCoverAvailable = (str: string): boolean => {
  switch (str) {
    case SHORT_TERM_COVER.YES:
      return true;

    case SHORT_TERM_COVER.ILC:
      return true;

    case SHORT_TERM_COVER.CILC:
      return true;

    case SHORT_TERM_COVER.REFER:
      return true;

    default:
      return false;
  }
};

export default mapShortTermCoverAvailable;
