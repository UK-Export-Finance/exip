import FIELD_IDS from '../../../constants/field-ids/insurance';

const { CHECK_YOUR_ANSWERS } = FIELD_IDS;

const { ELIGIBILITY, POLICY_AND_EXPORT, EXPORTER_BUSINESS, BUYER } = CHECK_YOUR_ANSWERS;

/**
 * Required fields for the insurance - check your answers section
 * @param {Array} Required field IDs
 */
const requiredFields = (): Array<string> => {
  const fields = [ELIGIBILITY, POLICY_AND_EXPORT, EXPORTER_BUSINESS, BUYER];

  return fields;
};

export default requiredFields;
