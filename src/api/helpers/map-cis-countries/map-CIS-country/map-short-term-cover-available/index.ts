import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: { SHORT_TERM_COVER_AVAILABLE },
} = EXTERNAL_API_DEFINITIONS;

/**
 * mapShortTermCoverAvailable
 * Transform a countries 'short term cover available' string to a boolean
 * @param {String} Risk category
 * @returns {Boolean}
 */
export const mapShortTermCoverAvailable = (str: string): boolean => {
  if (str === SHORT_TERM_COVER_AVAILABLE.YES) {
    return true;
  }

  if (str === SHORT_TERM_COVER_AVAILABLE.ILC) {
    return true;
  }

  if (str === SHORT_TERM_COVER_AVAILABLE.CILC) {
    return true;
  }

  if (str === SHORT_TERM_COVER_AVAILABLE.REFER) {
    return true;
  }

  return false;
};

export default mapShortTermCoverAvailable;
