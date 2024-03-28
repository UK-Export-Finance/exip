import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  INSURANCE: {
    YOUR_BUYER: { FAILED_PAYMENTS: FIELD_ID },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

/**
 * failedPaymentsRule
 * Check submitted form data to see if failed payments field radio is selected
 * Returns emptyFieldValidation if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const failedPaymentsRule = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default failedPaymentsRule;
