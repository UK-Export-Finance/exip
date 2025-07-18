import { RiskClassifications } from '../../../types';
import { EXTERNAL_API_MAPPINGS } from '../../constants';

/**
 * Determines if the provided ESRA classification indicates a high risk country.
 *
 * @param esraClassification - The risk classification to evaluate.
 * @returns `true` if the classification is considered high risk, otherwise `false`.
 */
const isHighRiskCountry = (riskClassification: RiskClassifications | undefined) => riskClassification === EXTERNAL_API_MAPPINGS.CIS.RISK.HIGH;

export default isHighRiskCountry;
