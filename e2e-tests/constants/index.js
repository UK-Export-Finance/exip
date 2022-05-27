const FIELDS = {
  VALID_COMPANY_BASE: 'validCompanyBase',
  VALID_BUYER_BASE: 'validBuyerBase',
  TRIED_PRIVATE_COVER: 'triedPrivateCover',
  COUNTRY: 'country',
  FINAL_DESTINATION: 'finalDestination',
  UK_CONTENT_PERCENTAGE: 'ukContentPercentage',

  CREDIT_LIMIT_GROUP: 'creditLimitGroup',
  CREDIT_LIMIT_CURRENCY: 'creditLimitCurrency',
  CREDIT_LIMIT: 'creditLimit',
  PRE_CREDIT_PERIOD: 'preCreditPeriodDays',
  CREDIT_PERIOD: 'creditPeriodDays',
  POLICY_LENGTH: 'policyLengthMonths',
  POLICY_TYPE: 'policyType',
};

const FIELD_VALUES = {
  POLICY_TYPE: {
    SINGLE: 'single',
    MULTI: 'multi',
  },
};

const ROUTES = {
  BEFORE_YOU_START: '/',
  COMPANY_BASED: '/company-based',
  COMPANY_BASED_UNAVAILABLE: '/company-based/unavailable',
  BUYER_BASED: '/buyer-based',
  BUYER_BASED_UNAVAILABLE: '/buyer-based/unavailable',
  TRIED_TO_OBTAIN_COVER: '/tried-to-obtain-cover',
  FINAL_DESTINATION: '/final-destination',
  UK_CONTENT_PERCENTAGE: '/uk-content-percentage',
  TELL_US_ABOUT_YOUR_DEAL: '/tell-us-about-your-deal',
  CHECK_YOUR_ANSWERS: '/check-your-answers',
  PROBLEM_WITH_SERVICE: '/problem-with-service',
};

const TEMPLATES = {
  BEFORE_YOU_START: 'before-you-start.njk',
  COMPANY_BASED: 'company-based.njk',
  COMPANY_BASED_UNAVAILABLE: 'company-based-unavailable.njk',
  BUYER_BASED: 'buyer-based.njk',
  BUYER_BASED_UNAVAILABLE: 'buyer-based-unavailable.njk',
  TRIED_TO_OBTAIN_COVER: 'tried-to-obtain-cover.njk',
  FINAL_DESTINATION: 'final-destination.njk',
  UK_CONTENT_PERCENTAGE: 'uk-content-percentage.njk',
  TELL_US_ABOUT_YOUR_DEAL: 'tell-us-about-your-deal.njk',
  PROBLEM_WITH_SERVICE: 'problem-with-service.njk',
};

const CONSTANTS = {
  FIELDS,
  FIELD_VALUES,
  ROUTES,
  TEMPLATES,
};

module.exports = CONSTANTS;
