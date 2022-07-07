const standardRiskRates = require('./data/multi-policy/standard-risk');
const highRiskRates = require('./data/multi-policy/high-risk');
const veryHighRiskRates = require('./data/multi-policy/very-high-risk');

/*
 * Pricing grid dictionary
 * SINGLE_POLICY / MULTI_POLICY = the type of policy.
 * STANDARD_RISK, HIGH_RISK, VERY_HIGH_RISK = risk category/group. Each country has an associated risk.
 * months = The length of cover. AKA "HoR (horizon of risk)".
 * insuredFor = percentage of the export that will be insured.
 * premiumRate = percentage rate of the premium.
 * rating = TODO.
 * LGD = Loan Given Default. percentage TODO: meaning
 */
const PRICING_GRID = {
  SINGLE_POLICY: {
    STANDARD_RISK: [],
    HIGH_RISK: [],
    VERY_HIGH_RISK: [],
  },
  MULTI_POLICY: {
    STANDARD_RISK: standardRiskRates,
    HIGH_RISK: highRiskRates,
    VERY_HIGH_RISK: veryHighRiskRates,
  },
};

module.exports = PRICING_GRID;
