import { EXTERNAL_API_DEFINITIONS, EXTERNAL_API_MAPPINGS } from '../../../../constants';

const { CIS } = EXTERNAL_API_DEFINITIONS;

/**
 * mapEsraClassification
 * Transform a country's ESRAClassificationDesc field into a consistent string
 * @param {String} Risk category
 * @returns {String} Consistent ESRA classification
 */
const mapEsraClassification = (str: string): string | null => {
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

export default mapEsraClassification;
