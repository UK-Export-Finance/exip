import { RequestBody } from '../../../../../../types';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../../constants/field-ids/insurance/your-buyer';
import { objectHasProperty } from '../../../../../helpers/object';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const { OUTSTANDING_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS, TOTAL_OVERDUE_PAYMENTS } = YOUR_BUYER_FIELD_IDS;

/**
 * maps buyer trading history fields in correct format
 * if body contains CURRENCY_CODE, deletes ALTERNATIVE_CURRENCY_CODE and sets CURRENCY_CODE
 * if body has OUTSTANDING_PAYMENTS as false, then TOTAL_OUTSTANDING_PAYMENTS and TOTAL_OVERDUE_PAYMENTS set to null
 * if TOTAL_OUTSTANDING_PAYMENTS or TOTAL_OVERDUE_PAYMENTS are an empty string, then should be set to null
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

  /**
   * if populatedData contains OUTSTANDING_PAYMENTS
   * if it is set to false
   * then TOTAL_OUTSTANDING_PAYMENTS and TOTAL_OVERDUE_PAYMENTS should be set to null
   */
  if (objectHasProperty(populatedData, OUTSTANDING_PAYMENTS)) {
    if (populatedData[OUTSTANDING_PAYMENTS] === 'false') {
      populatedData[TOTAL_OUTSTANDING_PAYMENTS] = null;
      populatedData[TOTAL_OVERDUE_PAYMENTS] = null;
    }
  }

  if (populatedData[TOTAL_OUTSTANDING_PAYMENTS] === '') {
    populatedData[TOTAL_OUTSTANDING_PAYMENTS] = null;
  }

  if (populatedData[TOTAL_OVERDUE_PAYMENTS] === '') {
    populatedData[TOTAL_OVERDUE_PAYMENTS] = null;
  }

  return populatedData;
};

export default mapSubmittedData;
