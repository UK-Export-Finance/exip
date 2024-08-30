import { MINIMUM_CHARACTERS } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import numberAboveMinimumValidation from '../../../../../../../shared-validation/number-above-minimum';
import { RequestBody } from '../../../../../../../../types';

const MINIMUM = MINIMUM_CHARACTERS.POLICY.TOTAL_CONTRACT_VALUE;

const {
  CONTRACT_POLICY: {
    SINGLE: { TOTAL_CONTRACT_VALUE: FIELD_ID },
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
 * totalContractValueRules
 * Check submitted form data for errors with the TOTAL_CONTRACT_VALUE field
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * * @param {Object} errors: Errors from previous validation errors errors
 * @returns {ValidationErrors}
 */
const totalContractValueRules = (formBody: RequestBody, errors: object) =>
  numberAboveMinimumValidation({ formBody, fieldId: FIELD_ID, errorMessage: ERROR_MESSAGES_OBJECT, errors, minimum: MINIMUM });

export default totalContractValueRules;
