import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';

const {
  ELIGIBILITY: {
    HAVE_AN_ACCOUNT,
    BUYER_COUNTRY_ISO_CODE,
    COMPANIES_HOUSE,
    COMPANIES_HOUSE_NUMBER,
    COMPANY,
    COVER_PERIOD,
    COVER_PERIOD_ID,
    HAS_END_BUYER,
    TOTAL_CONTRACT_VALUE,
    TOTAL_CONTRACT_VALUE_ID,
    HAS_REVIEWED_ELIGIBILITY,
    ...FIELD_IDS
  },
} = INSURANCE_FIELD_IDS;

/**
 * List of field IDs that are not relevant.
 */
export const irrelevantFields = [BUYER_COUNTRY_ISO_CODE, COVER_PERIOD_ID, HAVE_AN_ACCOUNT, TOTAL_CONTRACT_VALUE_ID];

/**
 * Required fields for the insurance - eligibility section
 * Strip out the following fields that are part of eligibility, but do not require data checks.
 * Therefore, we do not want these fields in the list of required eligibility fields.
 * 1) HAVE_AN_ACCOUNT field - has no data/value.
 * 2) BUYER_COUNTRY_ISO_CODE field - data is saved as BUYER_COUNTRY relationship object.
 * 3) TOTAL_CONTRACT_VALUE_ID field - data is saved as TOTAL_CONTRACT_VALUE relationship object.
 * 4) COVER_PERIOD_ID field - data is saved as COVER_PERIOD relationship object.
 * @returns {Array} Required field IDs
 */
const requiredFields = (): Array<string> => {
  const fieldIds = Object.values(FIELD_IDS);

  return fieldIds.filter((id) => !irrelevantFields.includes(id));
};

export default requiredFields;
