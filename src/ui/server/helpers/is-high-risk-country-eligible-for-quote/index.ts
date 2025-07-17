import { RiskClassifications } from '../../../types';
import isHighRiskCountry from '../is-high-risk-country';

/**
 * Determines if a high-risk country is eligible for a quote based on its risk classification and requested cover amount.
 *
 * A country is considered ineligible if it is classified as high risk and the cover amount exceeds 90.
 *
 * @param riskClassification - The risk classification of the country.
 * @param cover - The requested cover amount.
 * @returns `true` if the country is eligible for a quote; `false` otherwise.
 */
const isHighRiskCountryEligible = (riskClassification: RiskClassifications, cover: number) => {
  const isHighRisk = isHighRiskCountry(riskClassification);
  const isOverCover = cover > 90;

  return !(isHighRisk && isOverCover);
};

export default isHighRiskCountryEligible;
