import FIELD_IDS from '../../../../../constants/field-ids/insurance/declarations';
import { isEmptyString } from '../../../../../helpers/string';
import { RequestBody } from '../../../../../../types';

const {
  MODERN_SLAVERY: { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map "Declarations - Modern slavery" fields
 * @param {RequestBody} formBody: Form body
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (isEmptyString(formBody[WILL_ADHERE_TO_ALL_REQUIREMENTS])) {
    populatedData[WILL_ADHERE_TO_ALL_REQUIREMENTS] = null;
  }

  if (isEmptyString(formBody[HAS_NO_OFFENSES_OR_INVESTIGATIONS])) {
    populatedData[HAS_NO_OFFENSES_OR_INVESTIGATIONS] = null;
  }

  if (isEmptyString(formBody[IS_NOT_AWARE_OF_EXISTING_SLAVERY])) {
    populatedData[IS_NOT_AWARE_OF_EXISTING_SLAVERY] = null;
  }

  return populatedData;
};

export default mapSubmittedData;
