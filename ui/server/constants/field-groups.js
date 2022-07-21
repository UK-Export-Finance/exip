const FIELD_IDS = require('./field-ids');
const ROUTES = require('./routes');
const { FIELDS } = require('../content-strings');

const {
  VALID_COMPANY_BASE,
  BUYER_COUNTRY,
} = FIELD_IDS;

const FIELD_GROUPS = {
  EXPORT_DETAILS: [
    {
      ID: BUYER_COUNTRY,
      ...FIELDS[BUYER_COUNTRY],
      CHANGE_ROUTE: ROUTES.BUYER_COUNTRY_CHANGE,
    },
    {
      ID: VALID_COMPANY_BASE,
      ...FIELDS[VALID_COMPANY_BASE],
      CHANGE_ROUTE: ROUTES.COMPANY_BASED_CHANGE,
    },
  ],
  POLICY_DETAILS: [],
};

module.exports = FIELD_GROUPS;
