import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../../../helpers/object';
import { RequestBody } from '../../../../../../../../types';
import wholeNumberAboveMinimumValidation from '../../../../../../../shared-validation/whole-number-above-minimum';

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
        MULTIPLE: { [FIELD_ID]: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

const MINIMUM = 1;

/**
 * totalSalesToBuyerRules
 * Check submitted form data for errors with the total sales to buyer field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const totalSalesToBuyerRules = (formBody: RequestBody, errors: object) => {
  // check if the field is empty.
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, errors);
  }

  // checks if value is whole number or below minimum
  return wholeNumberAboveMinimumValidation(formBody, FIELD_ID, ERROR_MESSAGE, errors, MINIMUM);
};

export default totalSalesToBuyerRules;
