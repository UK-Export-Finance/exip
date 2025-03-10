import DECLARATIONS_FIELD_IDS from '../../../../../constants/field-ids/insurance/declarations';
import { isEmptyString } from '../../../../../helpers/string';
import { RequestBody, ObjectType } from '../../../../../../types';

const {
  MODERN_SLAVERY: {
    WILL_ADHERE_TO_ALL_REQUIREMENTS,
    HAS_NO_OFFENSES_OR_INVESTIGATIONS,
    IS_NOT_AWARE_OF_EXISTING_SLAVERY,
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
  },
} = DECLARATIONS_FIELD_IDS;

/**
 * mapSubmittedData
 * Map "Declarations - Modern slavery" fields
 * @param {RequestBody} formBody: Form body
 * @returns {ObjectType} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): ObjectType => {
  const populatedData = formBody;

  /**
   * If any of the following fields are an empty string,
   * The value needs to be null, as per the data model.
   */
  if (isEmptyString(formBody[WILL_ADHERE_TO_ALL_REQUIREMENTS])) {
    populatedData[WILL_ADHERE_TO_ALL_REQUIREMENTS] = null;
  }

  if (isEmptyString(formBody[HAS_NO_OFFENSES_OR_INVESTIGATIONS])) {
    populatedData[HAS_NO_OFFENSES_OR_INVESTIGATIONS] = null;
  }

  if (isEmptyString(formBody[IS_NOT_AWARE_OF_EXISTING_SLAVERY])) {
    populatedData[IS_NOT_AWARE_OF_EXISTING_SLAVERY] = null;
  }

  /**
   * If any of the following fields are true,
   * The related conditional fields (for an answer of false) should be wiped.
   */
  if (formBody[WILL_ADHERE_TO_ALL_REQUIREMENTS] === 'true') {
    populatedData[CANNOT_ADHERE_TO_ALL_REQUIREMENTS] = '';
  }

  if (formBody[HAS_NO_OFFENSES_OR_INVESTIGATIONS] === 'true') {
    populatedData[OFFENSES_OR_INVESTIGATIONS] = '';
  }

  if (formBody[IS_NOT_AWARE_OF_EXISTING_SLAVERY] === 'true') {
    populatedData[AWARE_OF_EXISTING_SLAVERY] = '';
  }

  return populatedData;
};

export default mapSubmittedData;
