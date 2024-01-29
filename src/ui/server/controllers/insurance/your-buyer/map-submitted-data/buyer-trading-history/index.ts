import { RequestBody } from '../../../../../../types';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { objectHasProperty } from '../../../../../helpers/object';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

/**
 * maps buyer trading history fields in correct format
 * if body contains CURRENCY_CODE, deletes ALTERNATIVE_CURRENCY_CODE and sets CURRENCY_CODE
 * @param {RequestBody} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const { _csrf, ...populatedData } = formBody;

  if (objectHasProperty(populatedData, CURRENCY_CODE)) {
    /**
     * if CURRENCY_CODE is set to ALTERNATIVE_CURRENCY_CODE
     * then set CURRENCY_CODE to populatedData[ALTERNATIVE_CURRENCY_CODE]
     * delete populatedData[ALTERNATIVE_CURRENCY_CODE]
     */
    if (populatedData[CURRENCY_CODE] === ALTERNATIVE_CURRENCY_CODE) {
      populatedData[CURRENCY_CODE] = populatedData[ALTERNATIVE_CURRENCY_CODE];
    }

    delete populatedData[ALTERNATIVE_CURRENCY_CODE];
  }

  return populatedData;
};

export default mapSubmittedData;
