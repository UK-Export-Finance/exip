import { FIELD_IDS } from '../../../constants';

const { ACCOUNT_TO_APPLY_ONLINE, BUYER_COUNTRY_ISO_CODE, WANT_COVER_OVER_MAX_AMOUNT } = FIELD_IDS.INSURANCE.ELIGIBILITY;

/**
 * Required fields for the insurance - eligibility section
 * Strip out the following fields that are part of eligibility, but do not require data checks.
 * Therefore, we do not want these fields in the list of required eligibility fields.
 * 1) ACCOUNT_TO_APPLY_ONLINE field - has no data/value.
 * 2) BUYER_COUNTRY_ISO_CODE field - data is saved as BUYER_COUNTRY relationship object.
 * 3) WANT_COVER_OVER_MAX_AMOUNT field - data is saved as TOTAL_CONTRACT_VALUE relationship object.
 * @returns {Array} Required field IDs
 */
const requiredFields = (): Array<string> => {
  const fieldIds = Object.values(FIELD_IDS.INSURANCE.ELIGIBILITY);

  const filtered = fieldIds.filter(
    (fieldId) => fieldId !== ACCOUNT_TO_APPLY_ONLINE && fieldId !== BUYER_COUNTRY_ISO_CODE && fieldId !== WANT_COVER_OVER_MAX_AMOUNT,
  );

  return filtered;
};

export default requiredFields;
