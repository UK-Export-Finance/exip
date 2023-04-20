import { FIELD_IDS } from '../../../constants';

const { ACCOUNT_TO_APPLY_ONLINE } = FIELD_IDS.INSURANCE.ELIGIBILITY;

/**
 * Required fields for the insurance - eligibility section
 * Strip out the ACCOUNT_TO_APPLY_ONLINE field. This field is part of eligibility,
 * but we don't save this field (has no value). Therefore we do not want to include this
 * in the list of required eligibility fields.
 * @returns {Array} Required field IDs
 */
const requiredFields = () => Object.values(FIELD_IDS.INSURANCE.ELIGIBILITY).filter((fieldId) => fieldId !== ACCOUNT_TO_APPLY_ONLINE);

export default requiredFields;
