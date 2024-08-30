import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import numberAboveMinimumValidation from '../../../../../../../shared-validation/number-above-minimum';
import { RequestBody } from '../../../../../../../../types';

const {
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER: FIELD_ID },
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

export const MINIMUM = 1;

/**
 * totalSalesToBuyerRules
 * Check submitted form data for errors with the total sales to buyer field
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * * @param {Object} errors: Errors from previous validation errors errors
 * @returns {ValidationErrors}
 */
const totalSalesToBuyerRules = (formBody: RequestBody, errors: object) =>
  numberAboveMinimumValidation({ formBody, fieldId: FIELD_ID, errorMessage: ERROR_MESSAGES_OBJECT, errors, minimum: MINIMUM });

export default totalSalesToBuyerRules;
