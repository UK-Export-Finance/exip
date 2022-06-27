const FIELD_IDS = require('./field-ids');
const ROUTES = require('./routes');
const { FIELDS } = require('../content-strings');

const {
  VALID_COMPANY_BASE,
  BUYER_COUNTRY,
  TRIED_PRIVATE_COVER,
  UK_CONTENT_PERCENTAGE,
  AMOUNT,
  CURRENCY,
  CREDIT_PERIOD,
} = FIELD_IDS;

/*
 * Field groups
 * Groups of fields that will render in the Answers page.
 * These are fields that will always be present.
 * Additional fields are dynamically added to groups,
 * depending on the submitted answers.
 */

const FIELD_GROUPS = {
  COMPANY_DETAILS: [
    {
      ID: VALID_COMPANY_BASE,
      ...FIELDS[VALID_COMPANY_BASE],
      CHANGE_ROUTE: ROUTES.COMPANY_BASED_CHANGE,
    },
  ],
  EXPORT_DETAILS: [
    {
      ID: BUYER_COUNTRY,
      ...FIELDS[BUYER_COUNTRY],
      CHANGE_ROUTE: ROUTES.BUYER_BASED_CHANGE,
    },
    {
      ID: TRIED_PRIVATE_COVER,
      ...FIELDS[TRIED_PRIVATE_COVER],
      CHANGE_ROUTE: ROUTES.TRIED_TO_OBTAIN_COVER_CHANGE,
    },
    {
      ID: UK_CONTENT_PERCENTAGE,
      ...FIELDS[UK_CONTENT_PERCENTAGE],
      CHANGE_ROUTE: ROUTES.UK_CONTENT_PERCENTAGE_CHANGE,
    },
  ],
  DEAL_DETAILS: [
    {
      ID: AMOUNT,
      ...FIELDS[AMOUNT],
      CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
    },
    {
      ID: CURRENCY,
      ...FIELDS[CURRENCY],
      CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
    },
    {
      ID: CREDIT_PERIOD,
      ...FIELDS[CREDIT_PERIOD],
      CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
    },
  ],
};

module.exports = FIELD_GROUPS;
