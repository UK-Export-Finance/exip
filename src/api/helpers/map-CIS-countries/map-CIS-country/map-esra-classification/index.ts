import { EXTERNAL_API_DEFINITIONS, EXTERNAL_API_MAPPINGS } from '../../../../constants';
import { RiskClassifications } from '../../../../types';

const {
  CIS: { ESRA_CLASSIFICATION },
} = EXTERNAL_API_DEFINITIONS;

/**
 * mapEsraClassification
 * Transform a country's ESRAClassificationDesc field into a consistent string
 * @param {string} Risk category
 * @returns {string} Consistent ESRA classification
 */
const mapEsraClassification = (classification: string): RiskClassifications | null => {
  if (classification === ESRA_CLASSIFICATION.STANDARD) {
    return EXTERNAL_API_MAPPINGS.CIS.ESRA_CLASSIFICATION.STANDARD as RiskClassifications;
  }

  if (classification === ESRA_CLASSIFICATION.HIGH) {
    return classification as RiskClassifications;
  }

  if (classification === ESRA_CLASSIFICATION.VERY_HIGH) {
    return classification as RiskClassifications;
  }

  return null;
};

export default mapEsraClassification;
