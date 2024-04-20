import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { objectHasProperty } from '../../../../../helpers/object';
import { RequestBody } from '../../../../../../types';

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map agent service charge fields
 * @param {Express.Request.body} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (objectHasProperty(populatedData, FIXED_SUM_AMOUNT)) {
    populatedData[FIXED_SUM_AMOUNT] = Number(populatedData[FIXED_SUM_AMOUNT]);
  }

  if (objectHasProperty(populatedData, PERCENTAGE_CHARGE)) {
    populatedData[PERCENTAGE_CHARGE] = Number(populatedData[PERCENTAGE_CHARGE]);
  }

  return populatedData;
};

export default mapSubmittedData;
