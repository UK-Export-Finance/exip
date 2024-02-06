import YOUR_BUYER_FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';
import wholeNumberAboveMinimumValidation from '../../../../../../shared-validation/whole-number-above-minimum';

const { OUTSTANDING_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS: FIELD_ID } = YOUR_BUYER_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

export const MINIMUM = 1;

/**
 * totalOutstandingRules
 * Check submitted form data for errors with the total outstanding field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const totalOutstandingRules = (formBody: RequestBody, errors: object) => {
  if (formBody[OUTSTANDING_PAYMENTS] === 'true') {
    return wholeNumberAboveMinimumValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MINIMUM);
  }

  return errors;
};

export default totalOutstandingRules;
