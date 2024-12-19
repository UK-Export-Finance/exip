import FIELD_IDS from '../../../constants/field-ids/insurance';

const { DECLARATIONS } = FIELD_IDS;

const { AGREE_CONFIDENTIALITY, AGREE_ANTI_BRIBERY, HAS_ANTI_BRIBERY_CODE_OF_CONDUCT, WILL_EXPORT_WITH_CODE_OF_CONDUCT, AGREE_CONFIRMATION_ACKNOWLEDGEMENTS } =
  DECLARATIONS;

/**
 * getAntiBriberyCodeOfConductTasks
 * Get anti-bribery code of conduct tasks depending on if "has anti-bribery code of conduct" answer
 * @param {String} Application "Has anti-bribery code of conduct" flag
 * @returns {Array} Anti-bribery code of conduct tasks
 */
export const getAntiBriberyCodeOfConductTasks = (hasAntiBriberyCodeOfConduct?: boolean | null): Array<string> => {
  // has not been answered yet.
  if (hasAntiBriberyCodeOfConduct === undefined || hasAntiBriberyCodeOfConduct === null) {
    return [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT];
  }

  // has been answered 'yes' - additional fields required.
  if (hasAntiBriberyCodeOfConduct === true) {
    return [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT, WILL_EXPORT_WITH_CODE_OF_CONDUCT];
  }

  // has been answered 'no' - nothing else required.
  if (hasAntiBriberyCodeOfConduct === false) {
    return [];
  }

  // invalid data type.
  return [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT];
};

/**
 * Required fields for the insurance - declarations section
 * @param {Array<string>} Required field IDs
 */
const requiredFields = (hasAntiBriberyCodeOfConduct?: boolean | null): Array<string> => {
  const fields = [
    AGREE_CONFIDENTIALITY,
    AGREE_ANTI_BRIBERY,
    AGREE_CONFIRMATION_ACKNOWLEDGEMENTS,
    ...getAntiBriberyCodeOfConductTasks(hasAntiBriberyCodeOfConduct),
  ];

  return fields;
};

export default requiredFields;
