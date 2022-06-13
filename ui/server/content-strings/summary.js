const FIELD_IDS = require('../constants/field-ids');

const SUMMARY = {
  [FIELD_IDS.VALID_COMPANY_BASE]: 'Located in the UK',
  [FIELD_IDS.VALID_BUYER_BASE]: 'Outside of the UK',
  [FIELD_IDS.TRIED_PRIVATE_COVER]: 'Private cover not available',
  [FIELD_IDS.UK_CONTENT_PERCENTAGE]: 'At least 20%',
};

module.exports = SUMMARY;
