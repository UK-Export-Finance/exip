import { RiskClassifications } from '../../../types';
import { PERCENTAGES_OF_COVER } from '../../constants';
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
const isHighRiskCountryEligible = (riskClassification: RiskClassifications | undefined, cover: number) => {
  const isHighRisk = isHighRiskCountry(riskClassification); // 'High' risk
  const isOverCover = cover > PERCENTAGES_OF_COVER[4]; // 90%

  return !(isHighRisk && isOverCover);
};

export default isHighRiskCountryEligible;
