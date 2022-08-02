const FIELD_IDS = {
  VALID_COMPANY_BASE: 'validCompanyBase',
  BUYER_COUNTRY: 'buyerCountry',
  CAN_GET_PRIVATE_INSURANCE: 'canGetPrivateInsurance',
  CAN_GET_PRIVATE_INSURANCE_YES: 'canGetPrivateInsuranceYes',
  CAN_GET_PRIVATE_INSURANCE_NO: 'canGetPrivateInsuranceNo',
  COUNTRY: 'country',
  HAS_MINIMUM_UK_GOODS_OR_SERVICES: 'hasMinimumUkGoodsOrServices',
  AMOUNT_CURRENCY: 'amountAndCurrency',
  CURRENCY: 'currency',
  CONTRACT_VALUE: 'contractValue',
  MAX_AMOUNT_OWED: 'maximumContractAmountOwed',
  CREDIT_PERIOD: 'creditPeriodInMonths',
  POLICY_TYPE: 'policyType',
  SINGLE_POLICY_TYPE: 'singlePolicyType',
  MULTI_POLICY_TYPE: 'multiPolicyType',
  POLICY_LENGTH: 'policyLength',
  SINGLE_POLICY_LENGTH: 'singlePolicyLengthMonths',
  MULTI_POLICY_LENGTH: 'multiPolicyLengthMonths',
  PERCENTAGE_OF_COVER: 'percentageOfCover',
  QUOTE: {
    INSURED_FOR: 'insuredFor',
    PREMIUM_RATE_PERCENTAGE: 'premiumRatePercentage',
    ESTIMATED_COST: 'estimatedCost',
    BUYER_LOCATION: 'buyerCountry', //  TODO: buyer location / buyer country?
  },
};

module.exports = FIELD_IDS;
