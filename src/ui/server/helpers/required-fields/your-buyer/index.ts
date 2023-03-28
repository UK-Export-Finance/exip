import { FIELD_IDS } from '../../../constants';

const { REGISTRATION_NUMBER, WEBSITE: BUYER_WEBSITE, ...COMPANY_OR_ORGANISATION_FIELDS } = FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION;

/**
 * Required fields for the insurance - your buyer section
 * @param {Array} Required field IDs
 */
const requiredFields = () =>
  Object.values({
    ...COMPANY_OR_ORGANISATION_FIELDS,
    ...FIELD_IDS.INSURANCE.YOUR_BUYER.WORKING_WITH_BUYER,
  });

export default requiredFields;
