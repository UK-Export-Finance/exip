import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const { CIS } = EXTERNAL_API_DEFINITIONS;

/**
 * mapNbiIssueAvailable
 * Transform a countries 'NBI issue available' string to a boolean
 * @param {String} NBI flag
 * @returns {Boolean}
 */
export const mapNbiIssueAvailable = (str: string): boolean => {
  if (str === CIS.NBI_ISSUE_AVAILABLE.YES) {
    return true;
  }

  return false;
};

export default mapNbiIssueAvailable;
