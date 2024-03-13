import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../types';
import { objectHasProperty } from '../../../../../helpers/object';

const {
  LOSS_PAYEE: { IS_APPOINTED },
  LOSS_PAYEE_DETAILS: { LOCATION, IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK },
} = POLICY_FIELD_IDS;

/**
 * mapSubmittedData
 * if not IS_APPOINTED, wipe IS_APPOINTED data.
 * @param {Express.Request.body} Form data
 * @returns {Object} populated data
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (!objectHasProperty(populatedData, IS_APPOINTED)) {
    delete populatedData[IS_APPOINTED];
  }

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
