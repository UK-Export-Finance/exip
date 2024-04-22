import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { objectHasProperty } from '../../../../../helpers/object';
import { isEmptyString } from '../../../../../helpers/string';
import { RequestBody } from '../../../../../../types';

const {
  AGENT_CHARGES: { PERCENTAGE_CHARGE, FIXED_SUM_AMOUNT, METHOD },
} = FIELD_IDS;

/**
 * mapSubmittedData
 * Map agent service charge fields
 * @param {RequestBody} formBody: Form body
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const populatedData = formBody;

  if (objectHasProperty(populatedData, PERCENTAGE_CHARGE)) {
    populatedData[PERCENTAGE_CHARGE] = Number(populatedData[PERCENTAGE_CHARGE]);
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
