const {
  PRICING_GRID_MAP,
  getPremiumRate,
} = require('.');
const {
  API,
  FIELD_VALUES,
} = require('../../constants');
const PRICING_GRID = require('../pricing-grid');

const expectedPremiumRate = (
  policyType,
  riskCategory,
  policyLengthInMonths,
  insuredFor,
) => {
  const mappedPolicyType = PRICING_GRID_MAP.POLICY_TYPE[policyType];
  const mappedRiskCategory = PRICING_GRID_MAP.RISK_CATEGORY[riskCategory];

  const risk = PRICING_GRID[mappedPolicyType][mappedRiskCategory];

  const expectedMonth = risk.find(({ months }) => months === policyLengthInMonths);

  const expectedRateObj = expectedMonth.rates.find((rate) => rate.insuredFor === insuredFor);

  const expected = expectedRateObj.premiumRate;

  return expected;
};

const getResultAndExpected = (
  policyType,
  riskCategory,
  totalMonths,
  insuredFor,
) => {
  const result = getPremiumRate(
    policyType,
    riskCategory,
    totalMonths,
    insuredFor,
  );

  const expected = expectedPremiumRate(
    policyType,
    riskCategory,
    totalMonths,
    insuredFor,
  );

  return {
    result,
    expected,
  };
};

describe('server/generate-quote/get-premium-rate', () => {
  it('returns a number', () => {
    const mock = {
      policyType: FIELD_VALUES.POLICY_TYPE.MULTI,
      insuredFor: 80,
      riskCategory: API.MAPPINGS.RISK.STANDARD,
      totalMonths: 2,
    };

    const result = getPremiumRate(
      mock.policyType,
      mock.riskCategory,
      mock.totalMonths,
      mock.insuredFor,
    );

    expect(typeof result).toEqual('number');
  });
});

module.exports = getResultAndExpected;
