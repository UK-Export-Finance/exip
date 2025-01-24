import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { isEmptyString } from '../../../../../helpers/string';
import { objectHasProperty } from '../../../../../helpers/object';
import { RequestBody, ApplicationBroker } from '../../../../../../types';

const {
  USING_BROKER,
  BROKER_DETAILS: { BUILDING_NUMBER_OR_NAME, EMAIL, IS_BASED_IN_UK, NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, COUNTY, POSTCODE },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map broker fields
 * @param {RequestBody} formBody: Form body
 * @param {ApplicationBroker} brokerData: Application broker data
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody, brokerData: ApplicationBroker): object => {
  /**
   * Freeze an instance of the form body,
   * so that we can check the original data at any stage.
   */
  const formBodyData = Object.freeze({ ...formBody });

  const populatedData = formBody;

  /**
   * If USING_BROKER is false,
   * nullify/wipe all USING_BROKER and address lookup related fields.
   */
  if (formBodyData[USING_BROKER] === 'false') {
    populatedData[NAME] = '';
    populatedData[EMAIL] = '';
    populatedData[IS_BASED_IN_UK] = null;

    populatedData[FULL_ADDRESS] = '';
    populatedData[BUILDING_NUMBER_OR_NAME] = '';
    populatedData[ADDRESS_LINE_1] = '';
    populatedData[ADDRESS_LINE_2] = '';
    populatedData[TOWN] = '';
    populatedData[COUNTY] = '';
    populatedData[POSTCODE] = '';
  }

  /**
   * If USING_BROKER is an empty string,
   * delete the field.
   */
  if (isEmptyString(formBodyData[USING_BROKER])) {
    delete populatedData[USING_BROKER];
  }

  /**
   * If IS_BASED_IN_UK is an empty string,
   * make the field null.
   */
  if (isEmptyString(formBodyData[IS_BASED_IN_UK])) {
    populatedData[IS_BASED_IN_UK] = null;
  }

  /**
   * If IS_BASED_IN_UK is false,
   * nullify/wipe all address lookup related fields
   */
  if (formBodyData[IS_BASED_IN_UK] === 'false') {
    populatedData[POSTCODE] = '';
    populatedData[BUILDING_NUMBER_OR_NAME] = '';
    populatedData[ADDRESS_LINE_1] = '';
    populatedData[ADDRESS_LINE_2] = '';
    populatedData[TOWN] = '';
    populatedData[COUNTY] = '';
  }

  /**
   * If broker data has a IS_BASED_IN_UK flag,
   * and FULL_ADDRESS is provided and empty,
   * wipe all address lookup related fields.
   */

  const fullAddressValue = formBodyData[FULL_ADDRESS];

  const fullAddressIsPopulated = fullAddressValue && !isEmptyString(fullAddressValue);

  if (brokerData[IS_BASED_IN_UK] && fullAddressIsPopulated) {
    populatedData[BUILDING_NUMBER_OR_NAME] = '';
    populatedData[ADDRESS_LINE_1] = '';
    populatedData[ADDRESS_LINE_2] = '';
    populatedData[TOWN] = '';
    populatedData[COUNTY] = '';
    populatedData[POSTCODE] = '';
  }

  /**
   * If POSTCODE is provided,
   * wipe the FULL_ADDRESS field.
   */
  if (objectHasProperty(formBodyData, POSTCODE)) {
    populatedData[FULL_ADDRESS] = '';
  }

  /**
   * If SELECT_THE_ADDRESS is provided,
   * or is an empty string,
   * delete the field.
   */
  if (objectHasProperty(formBodyData, SELECT_THE_ADDRESS) || isEmptyString(formBodyData[SELECT_THE_ADDRESS])) {
    delete populatedData[SELECT_THE_ADDRESS];
  }

  return populatedData;
};

export default mapSubmittedData;
