import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';

const {
  ELIGIBILITY: {
    ACCOUNT_TO_APPLY_ONLINE,
    BUYER_COUNTRY_ISO_CODE,
    COMPANY,
    COMPANIES_HOUSE,
    COMPANIES_HOUSE_NUMBER,
    TOTAL_CONTRACT_VALUE_ID,
    WANT_COVER_OVER_MAX_AMOUNT,
    WANT_COVER_OVER_MAX_PERIOD,
    COVER_PERIOD_ID,
    ...FIELD_IDS
  },
} = INSURANCE_FIELD_IDS;

/**
 * List of field IDs that are not relevant.
 */
export const irrelevantFields = [
  ACCOUNT_TO_APPLY_ONLINE,
  BUYER_COUNTRY_ISO_CODE,
  WANT_COVER_OVER_MAX_AMOUNT,
  TOTAL_CONTRACT_VALUE_ID,
  WANT_COVER_OVER_MAX_PERIOD,
  COVER_PERIOD_ID,
];

/**
 * Required fields for the insurance - eligibility section
 * Strip out the following fields that are part of eligibility, but do not require data checks.
 * Therefore, we do not want these fields in the list of required eligibility fields.
 * 1) ACCOUNT_TO_APPLY_ONLINE field - has no data/value.
 * 2) BUYER_COUNTRY_ISO_CODE field - data is saved as BUYER_COUNTRY relationship object.
 * 3) WANT_COVER_OVER_MAX_AMOUNT field - data is saved as TOTAL_CONTRACT_VALUE relationship object.
 * 4) WANT_COVER_OVER_MAX_PERIOD - data is saved as COVER_PERIOD relationship object.
 * @returns {Array} Required field IDs
 */
const requiredFields = (): Array<string> => {
  const fieldIds = Object.values(FIELD_IDS);

  return fieldIds.filter((id) => !irrelevantFields.includes(id));
};

export default requiredFields;
