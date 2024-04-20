import YOUR_BUYER_FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import wholeNumberAboveMinimumValidation from '../../../../../../shared-validation/whole-number-above-minimum';
import { RequestBody } from '../../../../../../../types';

const { OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE: FIELD_ID } = YOUR_BUYER_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

export const MINIMUM = 1;

/**
 * amountOverdueRules
 * Check submitted form data for errors with the amount overdue field
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const amountOverdueRules = (formBody: RequestBody, errors: object) => {
  if (formBody[OUTSTANDING_PAYMENTS] === 'true') {
    return wholeNumberAboveMinimumValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MINIMUM);
  }

  return errors;
};

export default amountOverdueRules;
