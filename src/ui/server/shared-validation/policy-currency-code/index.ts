import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../content-strings';
import emptyFieldValidation from '../empty-field';
import { RequestBody } from '../../../types';

const {
  CURRENCY: { CURRENCY_CODE: FIELD_ID },
} = INSURANCE_FIELD_IDS;

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
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const policyCurrencyCodeRules = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default policyCurrencyCodeRules;
