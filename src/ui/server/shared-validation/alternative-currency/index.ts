import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { objectHasProperty } from '../../helpers/object';
import emptyFieldValidation from '../empty-field';
import { RequestBody } from '../../../types';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE: FIELD_ID },
} = INSURANCE_FIELD_IDS;

/**
 * alternativeCurrencyRule
 * Check if CURRENCY_CODE is ALTERNATIVE_CURRENCY_CODE.
 * If so, return emptyFieldValidation for the ALTERNATIVE_CURRENCY_CODE field.
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const alternativeCurrencyValidation = (formBody: RequestBody, errors: object, errorMessage: string) => {
  if (objectHasProperty(formBody, CURRENCY_CODE) && formBody[CURRENCY_CODE] === FIELD_ID) {
    return emptyFieldValidation(formBody, FIELD_ID, errorMessage, errors);
  }

  return errors;
};

export default alternativeCurrencyValidation;
