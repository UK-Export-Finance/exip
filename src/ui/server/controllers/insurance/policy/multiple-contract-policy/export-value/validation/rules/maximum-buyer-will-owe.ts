import { MINIMUM_CHARACTERS } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import numberAboveMinimumValidation from '../../../../../../../shared-validation/number-above-minimum';
import { RequestBody } from '../../../../../../../../types';

const {
  EXPORT_VALUE: {
    MULTIPLE: { MAXIMUM_BUYER_WILL_OWE: FIELD_ID },
  },
} = POLICY_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      EXPORT_VALUE: {
        MULTIPLE: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
      },
    },
  },
} = ERROR_MESSAGES;

const MINIMUM = MINIMUM_CHARACTERS.POLICY.MAXIMUM_BUYER_WILL_OWE;

/**
 * maximumBuyerWillOweRules
 * Check submitted form data for errors with the maximum buyer will owe field
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {object} errors: Errors from previous validation errors
 * @returns {ValidationErrors}
 */
const maximumBuyerWillOweRules = (formBody: RequestBody, errors: object) =>
  numberAboveMinimumValidation({ formBody, fieldId: FIELD_ID, errorMessage: ERROR_MESSAGES_OBJECT, errors, minimum: MINIMUM });

export default maximumBuyerWillOweRules;
