import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { objectHasProperty } from '../../../../../../../helpers/object';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

/**
 * alternativeCurrencyRule
 * Check if CURRENCY_CODE is ALTERNATIVE_CURRENCY_CODE.
 * If so, return emptyFieldValidation for the ALTERNATIVE_CURRENCY_CODE field.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const alternativeCurrencyRule = (formBody: RequestBody, errors: object) => {
  if (objectHasProperty(formBody, CURRENCY_CODE) && formBody[CURRENCY_CODE] === FIELD_ID) {
    return emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  return errors;
};

export default alternativeCurrencyRule;
