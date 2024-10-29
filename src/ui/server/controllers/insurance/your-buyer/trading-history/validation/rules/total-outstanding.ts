import { MINIMUM_CHARACTERS } from '../../../../../../constants';
import YOUR_BUYER_FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';
import numberAboveMinimumValidation from '../../../../../../shared-validation/number-above-minimum';

const { OUTSTANDING_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS: FIELD_ID } = YOUR_BUYER_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

const MINIMUM = MINIMUM_CHARACTERS.BUYER.TOTAL_OUSTANDING;

/**
 * totalOutstandingRules
 * Check submitted form data for errors with the total outstanding field
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {Object} errors: Errors from previous validation errors
 * @returns {ValidationErrors}
 */
const totalOutstandingRules = (formBody: RequestBody, errors: object) => {
  if (formBody[OUTSTANDING_PAYMENTS] === 'true') {
    return numberAboveMinimumValidation({ formBody, fieldId: FIELD_ID, errorMessage: ERROR_MESSAGES_OBJECT, errors, minimum: MINIMUM });
  }

  return errors;
};

export default totalOutstandingRules;
