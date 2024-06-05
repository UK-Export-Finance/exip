import FIELD_IDS from '../../../constants/field-ids/insurance/check-your-answers';

/**
 * requiredFields
 * Required fields for the insurance - check your answers section
 * @returns {Array<string>} Required field IDs
 */
const requiredFields = Object.values(FIELD_IDS) as Array<string>;

export default requiredFields;
