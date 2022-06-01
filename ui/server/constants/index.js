const FIELD_IDS = require('./field-ids');
const FIELD_GROUPS = require('./field-groups');
const FIELD_VALUES = require('./field-values');
const ROUTES = require('./routes');

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
  CHECK_YOUR_ANSWERS: 'check-your-answers.njk',
  PROBLEM_WITH_SERVICE: 'problem-with-service.njk',
};

module.exports = {
  FIELDS: FIELD_IDS,
  FIELD_VALUES,
  FIELD_GROUPS,
  ROUTES,
  TEMPLATES,
};
