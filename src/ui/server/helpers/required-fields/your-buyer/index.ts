import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';

const YOUR_BUYER_FIELD_IDS = INSURANCE_FIELD_IDS.YOUR_BUYER;

const { REGISTRATION_NUMBER, WEBSITE: BUYER_WEBSITE, COUNTRY, ...COMPANY_OR_ORGANISATION_FIELDS } = YOUR_BUYER_FIELD_IDS.COMPANY_OR_ORGANISATION;

/**
 * Required fields for the insurance - your buyer section
 * @returns {Array} Required field IDs
 */
const requiredFields = () =>
  Object.values({
    ...COMPANY_OR_ORGANISATION_FIELDS,
    ...YOUR_BUYER_FIELD_IDS.WORKING_WITH_BUYER,
  });

export default requiredFields;
