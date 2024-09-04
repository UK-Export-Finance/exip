import { MINIMUM_CHARACTERS } from '../../../../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import numberAboveMinimumValidation from '../../../../../../../shared-validation/number-above-minimum';
import { RequestBody } from '../../../../../../../../types';

const MINIMUM = MINIMUM_CHARACTERS.POLICY.REQUESTED_CREDIT_LIMIT;

const {
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { REQUESTED_CREDIT_LIMIT: FIELD_ID },
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        SINGLE: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
      },
    },
  },
} = ERROR_MESSAGES;

/**
 * requestedCreditLimitRules
 * Check submitted form data for errors with the REQUESTED_CREDIT_LIMIT field
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * * @param {Object} errors: Errors from previous validation errors
 * @returns {ValidationErrors}
 */
const requestedCreditLimitRules = (formBody: RequestBody, errors: object) =>
  numberAboveMinimumValidation({ formBody, fieldId: FIELD_ID, errorMessage: ERROR_MESSAGES_OBJECT, errors, minimum: MINIMUM });

export default requestedCreditLimitRules;
