import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../types';
import { objectHasProperty } from '../../../../../helpers/object';
import stripHyphensAndSpacesFromString from '../../../../../helpers/strip-hyphens-and-spaces-from-string';

const {
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE },
} = POLICY_FIELD_IDS;

/**
 * mapSubmittedData
 * if not IS_APPOINTED, wipe IS_APPOINTED data.
 * @param {Express.Request.body} Form data
 * @returns {Object} populated data
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (objectHasProperty(populatedData, SORT_CODE)) {
    populatedData[SORT_CODE] = stripHyphensAndSpacesFromString(formBody[SORT_CODE]);
  }

  return populatedData;
};

export default mapSubmittedData;
