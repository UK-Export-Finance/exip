import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { isEmptyString } from '../../../../../helpers/string';
import { RequestBody } from '../../../../../../types';

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME, EMAIL, FULL_ADDRESS },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map agent fields
 * if USING_BROKER is false, delete BROKER_DETAILS fields
 * @param {RequestBody} formBody: Form body
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (formBody[USING_BROKER] === 'false') {
    populatedData[NAME] = '';
    populatedData[EMAIL] = '';
    populatedData[FULL_ADDRESS] = '';
  }

  /**
   * If USING_BROKER is an empty string,
   * Delete the field.
   */
  if (isEmptyString(formBody[USING_BROKER])) {
    delete populatedData[USING_BROKER];
  }

  return populatedData;
};

export default mapSubmittedData;
