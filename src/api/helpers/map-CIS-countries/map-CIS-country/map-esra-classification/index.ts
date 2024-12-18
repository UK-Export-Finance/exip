import { EXTERNAL_API_DEFINITIONS, EXTERNAL_API_MAPPINGS } from '../../../../constants';

const { CIS } = EXTERNAL_API_DEFINITIONS;

/**
 * mapEsraClassification
 * Transform a country's ESRAClassificationDesc field into a consistent string
 * @param {String} Risk category
 * @returns {String} Consistent ESRA classification
 */
const mapEsraClassification = (str: string): string | null => {
  if (str === CIS.ESRA_CLASSIFICATION.STANDARD) {
    return EXTERNAL_API_MAPPINGS.CIS.ESRA_CLASSIFICATION.STANDARD;
  }

  if (str === CIS.ESRA_CLASSIFICATION.HIGH) {
    return str;
  }

  if (str === CIS.ESRA_CLASSIFICATION.VERY_HIGH) {
    return str;
  }

  return null;
};

export default mapEsraClassification;
