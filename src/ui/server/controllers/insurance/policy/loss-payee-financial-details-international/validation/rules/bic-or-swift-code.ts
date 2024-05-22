import { MINIMUM_CHARACTERS, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';
import alphaNumericalCharactersOnlyValidation from '../../../../../../shared-validation/alpha-numerical-characters-only';
import minAndMaxLengthValidation from '../../../../../../shared-validation/min-and-max-length';
import { RequestBody } from '../../../../../../../types';

const { BIC_SWIFT_CODE: FIELD_ID } = FIELD_IDS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * Validate a BIC/SWIFT code is not:
 * 1) Empty
 * 2) Contains anything other than alpha numerical characters
 * 3) Below the minimum length
 * 4) Above the maximum length
 * @param {RequestBody} formBody: Form body
 * @param {Object} errors: Object from previous validation errors
 * @returns {ValidationErrors}
 */
const bicSwiftCodeValidation = (formBody: RequestBody, errors: object) => {
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.IS_EMPTY, errors);
  }

  const fieldValue = formBody[FIELD_ID].toUpperCase();

  const alphaNumericalOnlyErrors = alphaNumericalCharactersOnlyValidation(fieldValue, FIELD_ID, ERROR_MESSAGES_OBJECT.INCORRECT_FORMAT, errors);

  if (alphaNumericalOnlyErrors) {
    return alphaNumericalOnlyErrors;
  }

  return minAndMaxLengthValidation({
    fieldId: FIELD_ID,
    value: fieldValue,
    errorMessages: ERROR_MESSAGES_OBJECT,
    errors,
    minimum: MINIMUM_CHARACTERS.BIC_SWIFT_CODE,
    maximum: MAXIMUM_CHARACTERS.BIC_SWIFT_CODE,
  });
};

export default bicSwiftCodeValidation;
