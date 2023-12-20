import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';

const YOUR_BUYER_FIELD_IDS = INSURANCE_FIELD_IDS.YOUR_BUYER;

const { REGISTRATION_NUMBER, WEBSITE: BUYER_WEBSITE, COUNTRY, ...COMPANY_OR_ORGANISATION_FIELDS } = YOUR_BUYER_FIELD_IDS.COMPANY_OR_ORGANISATION;
// TODO: Remove EMS-2442
const { CONNECTION_TO_THE_BUYER_DESCRIPTION, ...WORKING_WITH_BUYER_FIELDS } = YOUR_BUYER_FIELD_IDS.WORKING_WITH_BUYER;

/**
 * Required fields for the insurance - your buyer section
 * @returns {Array} Required field IDs
 */
const requiredFields = () =>
  Object.values({
    ...COMPANY_OR_ORGANISATION_FIELDS,
    ...WORKING_WITH_BUYER_FIELDS,
  });

export default requiredFields;
