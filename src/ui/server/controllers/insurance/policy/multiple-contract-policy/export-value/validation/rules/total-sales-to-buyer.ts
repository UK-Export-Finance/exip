import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import wholeNumberAboveMinimumValidation from '../../../../../../../shared-validation/whole-number-above-minimum';
import { RequestBody } from '../../../../../../../../types';

const {
  POLICY: {
    EXPORT_VALUE: {
      MULTIPLE: { TOTAL_SALES_TO_BUYER: FIELD_ID },
    },
  },
} = INSURANCE_FIELD_IDS;

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
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const totalSalesToBuyerRules = (formBody: RequestBody, errors: object) =>
  wholeNumberAboveMinimumValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MINIMUM);

export default totalSalesToBuyerRules;
