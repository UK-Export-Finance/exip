import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../types';

const {
  POLICY: { NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

/**
 * creditPeriodWithBuyerRule
 * Returns the result of emptyFieldValidation if NEED_PRE_CREDIT_PERIOD is true
 * else returns provided errors object
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const creditPeriodWithBuyerRule = (formBody: RequestBody, errors: object) => {
  if (formBody[NEED_PRE_CREDIT_PERIOD] === 'true') {
    return providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM_CHARACTERS.CREDIT_PERIOD_WITH_BUYER);
  }

  return errors;
};

export default creditPeriodWithBuyerRule;
