import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../types';
import { objectHasProperty } from '../../../../../helpers/object';

const {
  LOSS_PAYEE: { IS_APPOINTED },
} = POLICY_FIELD_IDS;

/**
 * mapSubmittedData
 * if not IS_APPOINTED, wipe IS_APPOINTED data.
 * @param {Express.Request.body} Form data
 * @returns {Object} Page variables
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (!objectHasProperty(populatedData, IS_APPOINTED)) {
    delete populatedData[IS_APPOINTED];
  }

  return populatedData;
};

export default mapSubmittedData;
