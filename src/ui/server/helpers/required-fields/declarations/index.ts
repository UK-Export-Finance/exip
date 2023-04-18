import FIELD_IDS from '../../../constants/field-ids/insurance';
import { FIELD_VALUES } from '../../../constants/field-values';

const { DECLARATIONS } = FIELD_IDS;

const {
  AGREE_CONFIDENTIALITY,
  AGREE_ANTI_BRIBERY,
  HAS_ANTI_BRIBERY_CODE_OF_CONDUCT,
  WILL_EXPORT_WITH_CODE_OF_CONDUCT,
  AGREE_CONFIRMATION_ACKNOWLEDGEMENTS,
  AGREE_HOW_YOUR_DATA_WILL_BE_USED,
} = DECLARATIONS;

/**
 * getAntiBriberyCodeOfConductTasks
 * Get anti-bribery code of conduct tasks depending on if "has anti-bribery code of conduct" answer
 * @param {String} Has anti-bribery code of conduct answer
 * @returns {Array} Anti-bribery code of conduct tasks
 */
export const getAntiBriberyCodeOfConductTasks = (hasAntiBriberyCodeOfConduct: string): Array<string> => {
  if (hasAntiBriberyCodeOfConduct === FIELD_VALUES.YES) {
    return [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT, WILL_EXPORT_WITH_CODE_OF_CONDUCT];
  }

  return [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT];
};

/**
 * Required fields for the insurance - declarations section
 * @param {Array} Required field IDs
 */
const requiredFields = (hasAntiBriberyCodeOfConduct: string): Array<string> => {
  const fields = [
    AGREE_CONFIDENTIALITY,
    AGREE_ANTI_BRIBERY,
    AGREE_CONFIRMATION_ACKNOWLEDGEMENTS,
    AGREE_HOW_YOUR_DATA_WILL_BE_USED,
    ...getAntiBriberyCodeOfConductTasks(hasAntiBriberyCodeOfConduct),
  ];

  return fields;
};

export default requiredFields;
