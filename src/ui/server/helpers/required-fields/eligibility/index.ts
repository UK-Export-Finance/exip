import { FIELD_IDS } from '../../../constants';

const { ACCOUNT_TO_APPLY_ONLINE } = FIELD_IDS.INSURANCE.ELIGIBILITY;

/**
 * Required fields for the insurance - eligibility section
 * @param {Array} Required field IDs
 */
const requiredFields = () => Object.values(FIELD_IDS.INSURANCE.ELIGIBILITY).filter((fieldId) => fieldId !== ACCOUNT_TO_APPLY_ONLINE);

export default requiredFields;
