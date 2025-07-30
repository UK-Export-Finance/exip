import { HIGH_RISK_COUNTRY } from '../../constants';

/**
 * Determines if a quote is eligible for a high-risk country based on risk status and cover percentage.
 *
 * Eligibility is denied if the country is high-risk and the cover exceeds the maximum allowed percentage.
 *
 * @param isHighRisk - Indicates whether the country is considered high-risk. If `undefined`, treated as not high-risk.
 * @param cover - The percentage of cover requested.
 * @returns {boolean} `true` if eligible for a quote, `false` otherwise.
 */
const isHighRiskCountryEligible = (isHighRisk: boolean | undefined, cover: number) => {
  const isOverCover = cover > HIGH_RISK_COUNTRY.MAXIMUM_PERCENTAGE_OF_COVER; // 90

  return !(isHighRisk && isOverCover);
};

export default isHighRiskCountryEligible;
