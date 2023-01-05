import { FIELD_IDS } from '../../constants';
import { ERROR_MESSAGES } from '../../content-strings';
import generateValidationErrors from '../../helpers/validation';
import { objectHasProperty } from '../../helpers/object';
import { RequestBody } from '../../../types';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: { POLICY_CURRENCY_CODE: FIELD_ID },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

/**
 * policyCurrencyCodeRules
 * Check submitted form data for errors with the policy currency code field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const policyCurrencyCodeRules = (formBody: RequestBody, errors: object) => {
  const updatedErrors = errors;

  // check if the field is empty.
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  return updatedErrors;
};

export default policyCurrencyCodeRules;
