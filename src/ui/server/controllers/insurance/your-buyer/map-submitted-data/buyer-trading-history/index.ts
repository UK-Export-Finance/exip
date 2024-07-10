import { RequestBody } from '../../../../../../types';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../../constants/field-ids/insurance/your-buyer';
import { objectHasProperty } from '../../../../../helpers/object';
import { isEmptyString } from '../../../../../helpers/string';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const { OUTSTANDING_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE, TRADED_WITH_BUYER, FAILED_PAYMENTS } = YOUR_BUYER_FIELD_IDS;

/**
 * maps buyer trading history fields in correct format
 * if body contains CURRENCY_CODE, deletes ALTERNATIVE_CURRENCY_CODE and sets CURRENCY_CODE
 * if body has OUTSTANDING_PAYMENTS as false, then TOTAL_OUTSTANDING_PAYMENTS and TOTAL_AMOUNT_OVERDUE set to null
 * if TOTAL_OUTSTANDING_PAYMENTS or TOTAL_AMOUNT_OVERDUE are an empty string, then should be set to null
 * @param {RequestBody} formBody
 * @returns {Object} populatedData
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const { _csrf, ...populatedData } = formBody;

  /**
   * if TRADED_WITH_BUYER is false
   * all trading history fields should be wiped/set to null
   */
  if (objectHasProperty(populatedData, TRADED_WITH_BUYER)) {
    if (populatedData[TRADED_WITH_BUYER] === 'false') {
      populatedData[OUTSTANDING_PAYMENTS] = null;
      populatedData[FAILED_PAYMENTS] = null;
      populatedData[TOTAL_OUTSTANDING_PAYMENTS] = null;
      populatedData[TOTAL_AMOUNT_OVERDUE] = null;
    }
  }

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
   * then TOTAL_OUTSTANDING_PAYMENTS and TOTAL_AMOUNT_OVERDUE should be set to null
   */
  if (objectHasProperty(populatedData, OUTSTANDING_PAYMENTS)) {
    if (populatedData[OUTSTANDING_PAYMENTS] === 'false') {
      populatedData[TOTAL_OUTSTANDING_PAYMENTS] = null;
      populatedData[TOTAL_AMOUNT_OVERDUE] = null;
    }
  }

  /**
   * if the following radio inputs are empty strings
   * they should be set to null
   */
  if (isEmptyString(populatedData[TOTAL_OUTSTANDING_PAYMENTS])) {
    populatedData[TOTAL_OUTSTANDING_PAYMENTS] = null;
  }

  if (isEmptyString(populatedData[TOTAL_AMOUNT_OVERDUE])) {
    populatedData[TOTAL_AMOUNT_OVERDUE] = null;
  }

  if (isEmptyString(populatedData[OUTSTANDING_PAYMENTS])) {
    populatedData[OUTSTANDING_PAYMENTS] = null;
  }

  if (isEmptyString(populatedData[FAILED_PAYMENTS])) {
    populatedData[FAILED_PAYMENTS] = null;
  }

  return populatedData;
};

export default mapSubmittedData;
