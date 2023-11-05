import { EXTERNAL_API_MAPPINGS, FIELD_VALUES } from '../../constants';
import PRICING_GRID from '../pricing-grid.json';
import { PricingGrid, PricingGridMonth, PricingGridRate } from '../../../types';

const PRICING_GRID_MAP = {
  POLICY_TYPE: {
    [FIELD_VALUES.POLICY_TYPE.SINGLE]: 'SINGLE_POLICY',
    [FIELD_VALUES.POLICY_TYPE.MULTIPLE]: 'MULTIPLE_POLICY',
  },
  RISK_CATEGORY: {
    [EXTERNAL_API_MAPPINGS.CIS.RISK.STANDARD]: 'STANDARD',
    [EXTERNAL_API_MAPPINGS.CIS.RISK.HIGH]: 'HIGH',
    [EXTERNAL_API_MAPPINGS.CIS.RISK.VERY_HIGH]: 'VERY_HIGH',
  },
};

/**
 * getPremiumRate
 * @param {String} Type of policy
 * @param {Number} Risk category
 * @param {Number} Length of the policy in months
 * @param {Number} Percentage of the export that will be insured
 * @returns {Number} Premium rate percentage
 */
const getPremiumRate = (policyType: string, riskCategory: string, totalMonths: number, insuredFor: number): number => {
  const policyTypeKey = PRICING_GRID_MAP.POLICY_TYPE[policyType];

  const riskCategoryKey = PRICING_GRID_MAP.RISK_CATEGORY[riskCategory];

  const pricingGrid: any = PRICING_GRID as PricingGrid;

  const risk = pricingGrid[policyTypeKey][riskCategoryKey];

  const pricingGridMonth = risk.find((month: PricingGridMonth) => month.months === totalMonths);

  const rateObj = pricingGridMonth.rates.find((rate: PricingGridRate) => rate.insuredFor === insuredFor);

  return rateObj.premiumRate;
};

export { PRICING_GRID_MAP, getPremiumRate };
