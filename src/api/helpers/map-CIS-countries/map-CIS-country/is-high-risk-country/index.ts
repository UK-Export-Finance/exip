import { RiskClassifications } from '../../../../types';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: {
    ESRA_CLASSIFICATION: { HIGH },
  },
} = EXTERNAL_API_DEFINITIONS;

/**
 * Determines if the provided ESRA classification indicates a 'high' risk country only.
 * Note: For a very high risk country this will return false.
 *
 * @param esraClassification - The risk classification to evaluate.
 * @returns {Boolean} `true` if the classification is considered high risk, otherwise `false`.
 */
const isHighRiskCountry = (riskClassification: RiskClassifications | null) => riskClassification === HIGH;

export default isHighRiskCountry;
