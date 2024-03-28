import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { objectHasProperty } from '../../../../../../helpers/object';
import maxLengthValidation from '../../../../../../shared-validation/max-length';
import generateValidationErrors from '../../../../../../helpers/validation';
import { RequestBody } from '../../../../../../../types';

const {
  POLICY: { NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

export const MAXIMUM = 1000;

/**
 * creditPeriodWithBuyerRule
 * Returns the result of emptyFieldValidation if NEED_PRE_CREDIT_PERIOD is true
 * else returns provided errors object
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const creditPeriodWithBuyerRule = (formBody: RequestBody, errors: object) => {
  if (formBody[NEED_PRE_CREDIT_PERIOD] === 'true') {
    if (!objectHasProperty(formBody, FIELD_ID)) {
      return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
    }

    return maxLengthValidation(formBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, errors, MAXIMUM);
  }

  return errors;
};

export default creditPeriodWithBuyerRule;
