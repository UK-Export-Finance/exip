import FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { objectHasProperty } from '../../../../../helpers/object';
import { isEmptyString } from '../../../../../helpers/string';
import { RequestBody } from '../../../../../../types';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  EXPORT_CONTRACT: {
    AGENT_CHARGES: { PERCENTAGE_CHARGE, FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE, METHOD },
  },
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

  if (objectHasProperty(populatedData, CURRENCY_CODE)) {
    populatedData[FIXED_SUM_CURRENCY_CODE] = populatedData[CURRENCY_CODE];

    /**
     * CURRENCY_CODE should never exist.
     * This is purely a UI field and so should not be included in the data.
     */
    delete populatedData[CURRENCY_CODE];
  }

  if (objectHasProperty(populatedData, ALTERNATIVE_CURRENCY_CODE)) {
    populatedData[FIXED_SUM_CURRENCY_CODE] = populatedData[ALTERNATIVE_CURRENCY_CODE];

    /**
     * ALTERNATIVE_CURRENCY_CODE should never exist.
     * This is purely a UI field and so should not be included in the data.
     */
    delete populatedData[ALTERNATIVE_CURRENCY_CODE];
  }

  if (isEmptyString(populatedData[METHOD])) {
    populatedData[METHOD] = null;
  }

  return populatedData;
};

export default mapSubmittedData;
