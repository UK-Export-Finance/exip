import { MINIMUM_CHARACTERS } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import numberAboveMinimumValidation from '../../../../../../../shared-validation/number-above-minimum';
import { RequestBody } from '../../../../../../../../types';

const MINIMUM = MINIMUM_CHARACTERS.POLICY.REQUESTED_CREDIT_LIMIT;

const {
  CONTRACT_POLICY: {
    SINGLE: { REQUESTED_CREDIT_LIMIT: FIELD_ID },
  },
} = POLICY_FIELD_IDS;

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
 * @param {object} errors: Errors from previous validation errors
 * @returns {ValidationErrors}
 */
const requestedCreditLimitRules = (formBody: RequestBody, errors: object) =>
  numberAboveMinimumValidation({ formBody, fieldId: FIELD_ID, errorMessage: ERROR_MESSAGES_OBJECT, errors, minimum: MINIMUM });

export default requestedCreditLimitRules;
