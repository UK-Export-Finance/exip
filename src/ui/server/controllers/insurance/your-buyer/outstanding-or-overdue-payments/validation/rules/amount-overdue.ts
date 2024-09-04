import YOUR_BUYER_FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import numberAboveMinimumValidation from '../../../../../../shared-validation/number-above-minimum';
import { MINIMUM_CHARACTERS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';

const { TOTAL_AMOUNT_OVERDUE: FIELD_ID } = YOUR_BUYER_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

/**
 * amountOverdueRules
 * Check submitted form data for errors with the amount overdue field
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const amountOverdueRules = (formBody: RequestBody, errors: object) =>
  numberAboveMinimumValidation({ formBody, fieldId: FIELD_ID, errorMessage: ERROR_MESSAGES_OBJECT, errors, minimum: MINIMUM_CHARACTERS.ONE });

export default amountOverdueRules;
