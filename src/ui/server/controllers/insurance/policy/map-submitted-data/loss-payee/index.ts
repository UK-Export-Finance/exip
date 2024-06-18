import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { objectHasProperty } from '../../../../../helpers/object';
import sanitiseValue from '../../../../../helpers/sanitise-data/sanitise-value';
import { RequestBody } from '../../../../../../types';

const {
  LOSS_PAYEE: { IS_APPOINTED },
  LOSS_PAYEE_DETAILS: { IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK, LOCATION, NAME },
} = POLICY_FIELD_IDS;

/**
 * mapSubmittedData
 * if IS_APPOINTED is provided, sanitise the value.
 * if IS_APPOINTED has a value of false, wipe IS_APPOINTED related data.
 * if LOCATION, is provided, map LOCATION related data.
 * @param {Express.Request.body} Form data
 * @returns {Object} populated data
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  /**
   * If IS_APPOINTED is provided,
   * sanitise the value, to transform a boolean string into a boolean.
   */
  if (objectHasProperty(formBody, IS_APPOINTED)) {
    populatedData[IS_APPOINTED] = sanitiseValue({
      key: IS_APPOINTED,
      value: formBody[IS_APPOINTED],
    });

    /**
     * If IS_APPOINTED has a value of false, nullify IS_APPOINTED related data.
     * Finally, delete the IS_APPOINTED field.
     */
    if (!formBody[IS_APPOINTED]) {
      populatedData[NAME] = '';
      populatedData[IS_LOCATED_INTERNATIONALLY] = null;
      populatedData[IS_LOCATED_IN_UK] = null;
    }
  }

  /**
   * If LOCATION is IS_LOCATED_IN_UK,
   * map and wipe IS_LOCATED_INTERNATIONALLY.
   * Otherwise, If LOCATION is IS_LOCATED_INTERNATIONALLY,
   * map and wipe IS_LOCATED_IN_UK.
   * Finally, delete the LOCATION field.
   * LOCATION is used purely for the UI
   * and is not required for data saving.
   */
  if (objectHasProperty(populatedData, LOCATION)) {
    if (populatedData[LOCATION] === IS_LOCATED_IN_UK) {
      populatedData[IS_LOCATED_IN_UK] = true;
      populatedData[IS_LOCATED_INTERNATIONALLY] = false;
    }

    if (populatedData[LOCATION] === IS_LOCATED_INTERNATIONALLY) {
      populatedData[IS_LOCATED_INTERNATIONALLY] = true;
      populatedData[IS_LOCATED_IN_UK] = false;
    }

    delete populatedData[LOCATION];
  }

  return populatedData;
};

export default mapSubmittedData;
