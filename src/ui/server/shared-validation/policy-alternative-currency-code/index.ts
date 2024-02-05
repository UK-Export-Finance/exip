import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../content-strings';
import alternativeCurrencyValidation from '../alternative-currency';
import { RequestBody } from '../../../types';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

/**
 * policyAlternativeCurrencyCodeRule
 * Returns the result of emptyFieldValidation
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const policyAlternativeCurrencyCodeRule = (formBody: RequestBody, errors: object) => alternativeCurrencyValidation(formBody, errors, ERROR_MESSAGE.IS_EMPTY);

export default policyAlternativeCurrencyCodeRule;
