const {
  API,
  FIELD_VALUES,
} = require('../../constants');
const PRICING_GRID = require('../pricing-grid.json');

const PRICING_GRID_MAP = {
  POLICY_TYPE: {
    [FIELD_VALUES.POLICY_TYPE.SINGLE]: 'SINGLE_POLICY',
    [FIELD_VALUES.POLICY_TYPE.MULTI]: 'MULTI_POLICY',
  },
  RISK_CATEGORY: {
    [API.MAPPINGS.RISK.STANDARD]: 'STANDARD',
    [API.MAPPINGS.RISK.HIGH]: 'HIGH',
    [API.MAPPINGS.RISK.VERY_HIGH]: 'VERY_HIGH',
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
const getPremiumRate = (
  policyType,
  riskCategory,
  totalMonths,
  insuredFor,
) => {
  const policyTypeKey = PRICING_GRID_MAP.POLICY_TYPE[policyType];

  const riskCategoryKey = PRICING_GRID_MAP.RISK_CATEGORY[riskCategory];

  const risk = PRICING_GRID[policyTypeKey][riskCategoryKey];

  const month = risk.find(({ months }) => months === totalMonths);

  const rateObj = month.rates.find((rate) =>
    rate.insuredFor === insuredFor);

  return rateObj.premiumRate;
};

module.exports = {
  PRICING_GRID_MAP,
  getPremiumRate,
};
