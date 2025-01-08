import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { isEmptyString } from '../../../../../helpers/string';
import { objectHasProperty } from '../../../../../helpers/object';
import { RequestBody } from '../../../../../../types';

const {
  USING_BROKER,
  BROKER_DETAILS: { BUILDING_NUMBER_OR_NAME, EMAIL, IS_BASED_IN_UK, NAME, POSTCODE },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
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
   * delete the field.
   */
  if (isEmptyString(formBody[USING_BROKER])) {
    delete populatedData[USING_BROKER];
  }

  /**
   * If IS_BASED_IN_UK is an empty string,
   * nullify IS_BASED_IN_UK related fields
   */
  if (isEmptyString(formBody[IS_BASED_IN_UK])) {
    populatedData[IS_BASED_IN_UK] = null;
    populatedData[POSTCODE] = '';
    populatedData[BUILDING_NUMBER_OR_NAME] = '';
  }

  /**
   * If SELECT_THE_ADDRESS is provided,
   * or is an empty string,
   * delete the field.
   */
  if (objectHasProperty(formBody, SELECT_THE_ADDRESS) || isEmptyString(formBody[SELECT_THE_ADDRESS])) {
    delete populatedData[SELECT_THE_ADDRESS];
  }

  return populatedData;
};

export default mapSubmittedData;
