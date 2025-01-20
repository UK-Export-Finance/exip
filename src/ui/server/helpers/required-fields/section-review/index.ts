import FIELD_IDS from '../../../constants/field-ids/insurance/check-your-answers';

const { ELIGIBILITY, EXPORTER_BUSINESS, BUYER, POLICY, EXPORT_CONTRACT } = FIELD_IDS;

/**
 * requiredFields
 * Required fields for the insurance - check your answers section.
 * @returns {Array<string>} Array of tasks/field IDs
 */
const requiredFields = () => [ELIGIBILITY, EXPORTER_BUSINESS, BUYER, POLICY, EXPORT_CONTRACT];

export default requiredFields;
