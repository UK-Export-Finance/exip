const {
  PRICING_GRID_MAP,
  getPremiumRate,
} = require('./get-premium-rate');
const PRICING_GRID = require('./pricing-grid');
const { FIELD_VALUES } = require('../constants');

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
  policyLengthInMonths,
  insuredFor,
) => {
  const result = getPremiumRate(
    policyType,
    riskCategory,
    policyLengthInMonths,
    insuredFor,
  );

  const expected = expectedPremiumRate(
    policyType,
    riskCategory,
    policyLengthInMonths,
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
      riskCategory: 2,
      policyLengthInMonths: 2,
    };

    const result = getPremiumRate(
      mock.policyType,
      mock.riskCategory,
      mock.policyLengthInMonths,
      mock.insuredFor,
    );

    expect(typeof result).toEqual('number');
  });
});

module.exports = getResultAndExpected;
