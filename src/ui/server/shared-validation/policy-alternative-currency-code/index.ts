import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../content-strings';
import { objectHasProperty } from '../../helpers/object';
import emptyFieldValidation from '../empty-field';
import { RequestBody } from '../../../types';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

// TODO: DRY with other "alternative currency" validation for non-policy sections?
/**
 * policyAlternativeCurrencyCodeRules
 * Returns the result of emptyFieldValidation
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const policyAlternativeCurrencyCodeRules = (formBody: RequestBody, errors: object) => {
  if (objectHasProperty(formBody, CURRENCY_CODE) && formBody[CURRENCY_CODE] === FIELD_ID) {
    return emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  return errors;
};

export default policyAlternativeCurrencyCodeRules;
