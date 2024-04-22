import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { objectHasProperty } from '../../../../../helpers/object';
import { RequestBody } from '../../../../../../types';

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, CHARGE_PERCENTAGE },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map agent service charge fields
 * @param {RequestBody} formBody: Form body
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (objectHasProperty(populatedData, FIXED_SUM_AMOUNT)) {
    populatedData[FIXED_SUM_AMOUNT] = Number(populatedData[FIXED_SUM_AMOUNT]);
  }

  if (objectHasProperty(populatedData, CHARGE_PERCENTAGE)) {
    populatedData[CHARGE_PERCENTAGE] = Number(populatedData[CHARGE_PERCENTAGE]);
  }

  return populatedData;
};

export default mapSubmittedData;
