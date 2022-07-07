const singlePolicyStandardRiskRates = require('./data/single-policy/standard-risk');
const singlePolicyHighRiskRates = require('./data/single-policy/high-risk');
const singlePolicyVeryHighRiskRates = require('./data/single-policy/very-high-risk');
const multiPolicyStandardRiskRates = require('./data/multi-policy/standard-risk');
const multiPolicyHighRiskRates = require('./data/multi-policy/high-risk');
const multiPolicyVeryHighRiskRates = require('./data/multi-policy/very-high-risk');

/*
 * Pricing grid dictionary
 * SINGLE_POLICY / MULTI_POLICY = the type of policy.
 * STANDARD_RISK, HIGH_RISK, VERY_HIGH_RISK = risk category/group. Each country has an associated risk.
 * months = The length of cover. AKA "HoR (horizon of risk)".
 * insuredFor = percentage of the export that will be insured.
 * premiumRate = percentage rate of the premium.
 */
const PRICING_GRID = {
  SINGLE_POLICY: {
    STANDARD_RISK: singlePolicyStandardRiskRates,
    HIGH_RISK: singlePolicyHighRiskRates,
    VERY_HIGH_RISK: singlePolicyVeryHighRiskRates,
  },
  MULTI_POLICY: {
    STANDARD_RISK: multiPolicyStandardRiskRates,
    HIGH_RISK: multiPolicyHighRiskRates,
    VERY_HIGH_RISK: multiPolicyVeryHighRiskRates,
  },
};

module.exports = PRICING_GRID;
