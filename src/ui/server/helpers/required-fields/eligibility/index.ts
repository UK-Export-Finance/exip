import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';

const {
  ELIGIBILITY: { ACCOUNT_TO_APPLY_ONLINE, BUYER_COUNTRY_ISO_CODE, COMPANY_HOUSE, ...FIELD_IDS },
} = INSURANCE_FIELD_IDS;

/**
 * Required fields for the insurance - eligibility section
 * Strip out the ACCOUNT_TO_APPLY_ONLINE field. This field is part of eligibility,
 * but we don't save this field (has no value). Therefore we do not want to include this
 * in the list of required eligibility fields.
 * @returns {Array} Required field IDs
 */
const requiredFields = (): Array<string> => {
  const fieldIds = Object.values(FIELD_IDS);

  const filtered = fieldIds.filter((fieldId) => fieldId !== ACCOUNT_TO_APPLY_ONLINE && fieldId !== BUYER_COUNTRY_ISO_CODE);

  return filtered;
};

export default requiredFields;
