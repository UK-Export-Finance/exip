import { FIELD_IDS } from '../../../constants';

const { ACCOUNT_TO_APPLY_ONLINE, BUYER_COUNTRY_ISO_CODE } = FIELD_IDS.INSURANCE.ELIGIBILITY;

/**
 * Required fields for the insurance - eligibility section
 * Strip out the ACCOUNT_TO_APPLY_ONLINE field. This field is part of eligibility,
 * but we don't save this field (has no value). Therefore we do not want to include this
 * in the list of required eligibility fields.
 * @returns {Array} Required field IDs
 */
const requiredFields = (): Array<string> => {
  const fieldIds = Object.values(FIELD_IDS.INSURANCE.ELIGIBILITY);

  const filtered = fieldIds.filter((fieldId) => fieldId !== ACCOUNT_TO_APPLY_ONLINE && fieldId !== BUYER_COUNTRY_ISO_CODE);

  return filtered;
};

export default requiredFields;
