import YOUR_BUYER_FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { MINIMUM_CHARACTERS } from '../../../../../../constants';
import numberAboveMinimumValidation from '../../../../../../shared-validation/number-above-minimum';
import { RequestBody } from '../../../../../../../types';

const { TOTAL_OUTSTANDING_PAYMENTS: FIELD_ID } = YOUR_BUYER_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

/**
 * totalOutstandingRules
 * Check submitted form data for errors with the total outstanding field
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const totalOutstandingRules = (formBody: RequestBody, errors: object) =>
  numberAboveMinimumValidation({ formBody, fieldId: FIELD_ID, errorMessage: ERROR_MESSAGES_OBJECT, errors, minimum: MINIMUM_CHARACTERS.ONE });

export default totalOutstandingRules;
