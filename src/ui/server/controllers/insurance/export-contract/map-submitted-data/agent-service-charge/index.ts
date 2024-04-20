import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { objectHasProperty } from '../../../../../helpers/object';
import { isEmptyString } from '../../../../../helpers/string';
import { RequestBody } from '../../../../../../types';

const {
  AGENT_CHARGES: { CHARGE_PERCENTAGE, FIXED_SUM_AMOUNT, METHOD },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map agent service charge fields
 * @param {Express.Request.body} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (objectHasProperty(populatedData, CHARGE_PERCENTAGE)) {
    populatedData[CHARGE_PERCENTAGE] = Number(populatedData[CHARGE_PERCENTAGE]);
  }

  if (objectHasProperty(populatedData, FIXED_SUM_AMOUNT)) {
    populatedData[FIXED_SUM_AMOUNT] = Number(populatedData[FIXED_SUM_AMOUNT]);
  }

  if (isEmptyString(populatedData[METHOD])) {
    populatedData[METHOD] = null;
  }

  return populatedData;
};

export default mapSubmittedData;
