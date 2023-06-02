import { FIELD_IDS } from '../../../constants';

const { REGISTRATION_NUMBER, WEBSITE: BUYER_WEBSITE, COUNTRY, ...COMPANY_OR_ORGANISATION_FIELDS } = FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION;

/**
 * Required fields for the insurance - your buyer section
 * @returns {Array} Required field IDs
 */
const requiredFields = () =>
  Object.values({
    ...COMPANY_OR_ORGANISATION_FIELDS,
    ...FIELD_IDS.INSURANCE.YOUR_BUYER.WORKING_WITH_BUYER,
  });

export default requiredFields;
