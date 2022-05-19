const FIELDS = {
  VALID_COMPANY_BASE: 'validCompanyBase',
  VALID_BUYER_BASE: 'validBuyerBase',
};

const ROUTES = {
  BEFORE_YOU_START: '/',
  COMPANY_BASED: '/company-based',
  COMPANY_BASED_UNAVAILABLE: '/company-based/unavailable',
  BUYER_BASED: '/buyer-based',
  BUYER_BASED_UNAVAILABLE: '/buyer-based/unavailable',
  TRIED_TO_OBTAIN_COVER: '/tried-to-obtain-cover',
};

const TEMPLATES = {
  BEFORE_YOU_START: 'before-you-start.njk',
  COMPANY_BASED: 'company-based.njk',
  COMPANY_BASED_UNAVAILABLE: 'company-based-unavailable.njk',
  BUYER_BASED: 'buyer-based.njk',
  BUYER_BASED_UNAVAILABLE: 'buyer-based-unavailable.njk',
  TRIED_TO_OBTAIN_COVER: 'tried-to-obtain-cover.njk',
};

const CONSTANTS = {
  FIELDS,
  ROUTES,
  TEMPLATES,
};

module.exports = CONSTANTS;
