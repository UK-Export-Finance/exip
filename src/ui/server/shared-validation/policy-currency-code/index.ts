import { FIELD_IDS } from '../../constants';
import { ERROR_MESSAGES } from '../../content-strings';
import emptyFieldValidation from '../empty-field';
import { RequestBody } from '../../../types';

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: { POLICY_CURRENCY_CODE: FIELD_ID },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

/**
 * policyCurrencyCodeRules
 * Returns the result of emptyFieldValidation
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const policyCurrencyCodeRules = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default policyCurrencyCodeRules;
