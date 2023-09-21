import { EXTERNAL_API_DEFINITIONS, EXTERNAL_API_MAPPINGS } from '../../../../constants';

const { CIS } = EXTERNAL_API_DEFINITIONS;
/**
 * mapRiskCategory
 * Transform a countries risk category to a consistent string
 * @param {String} Risk category
 * @returns {String} Consistent risk category
 */
export const mapRiskCategory = (str: string) => {
  if (str === CIS.RISK.STANDARD) {
    return EXTERNAL_API_MAPPINGS.CIS.RISK.STANDARD;
  }

  if (str === CIS.RISK.HIGH) {
    return str;
  }

  if (str === CIS.RISK.VERY_HIGH) {
    return str;
  }

  return null;
};

export default mapRiskCategory;
