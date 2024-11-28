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
 * @param {String} policyType: Type of policy
 * @param {String | null} esraClassification: ESRA classification
 * @param {Number} totalMonths: Length of the policy in months
 * @param {Number} insuredFor: Percentage of the export that will be insured
 * @returns {Number} Premium rate percentage
 */
const getPremiumRate = (policyType: string, esraClassification: string, totalMonths: number, insuredFor: number): number => {
  try {
    console.info('Getting premium rate');

    const policyTypeKey = PRICING_GRID_MAP.POLICY_TYPE[policyType];

    const esraClassificationKey = PRICING_GRID_MAP.RISK_CATEGORY[esraClassification];

    const pricingGrid: PricingGrid = PRICING_GRID;

    const risk = pricingGrid[policyTypeKey][esraClassificationKey];

    const pricingGridMonth = risk.find((month: PricingGridMonth) => month.months === totalMonths);

    const rateObj = pricingGridMonth.rates.find((rate: PricingGridRate) => rate.insuredFor === insuredFor);

    return rateObj.premiumRate;
  } catch (error) {
    console.error('Error getting premium rate %o', error);

    throw new Error(`Getting premium rate ${error}`);
  }
};

export { PRICING_GRID_MAP, getPremiumRate };
