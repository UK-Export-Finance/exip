const PRICING_GRID = require('../generate-quote/pricing-grid');
const { FIELD_VALUES, API } = require('../constants');

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

// TODO: rename insuredFor to percentageOfCover
/**
 * getPercentagesOfCover
 * Get all available percentages of cover for a policy's type and risk
 * @param {String} Policy type
 * @param {String} Policy risk (Standard, High, Very high)
 * @returns {Array} Percentages of cover available
 */
const getPercentagesOfCover = (policyType, riskCategory) => {
  const policyTypeKey = PRICING_GRID_MAP.POLICY_TYPE[policyType];

  const riskCategoryKey = PRICING_GRID_MAP.RISK_CATEGORY[riskCategory];

  const riskObj = PRICING_GRID[policyTypeKey][riskCategoryKey];

  return riskObj.COVER_PERCENTAGES;
};

module.exports = getPercentagesOfCover;
