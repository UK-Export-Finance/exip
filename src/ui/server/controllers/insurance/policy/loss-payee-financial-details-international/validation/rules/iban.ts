import { MINIMUM_CHARACTERS, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';
import minAndMaxLengthValidation from '../../../../../../shared-validation/min-and-max-length';
import { RequestBody } from '../../../../../../../types';

const { IBAN: FIELD_ID } = FIELD_IDS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * Validate an IBAN field is not:
 * 1) Empty
 * 2) Below the minimum length
 * 3) Above the maximum length
 * @param {RequestBody} formBody: Form body
 * @param {Object} errors: Object from previous validation errors
 * @returns {Object} Validation errors
 */
const ibanValidation = (formBody: RequestBody, errors: object) => {
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.IS_EMPTY, errors);
  }

  return minAndMaxLengthValidation({
    fieldId: FIELD_ID,
    value: formBody[FIELD_ID],
    errorMessages: ERROR_MESSAGES_OBJECT,
    errors,
    minimum: MINIMUM_CHARACTERS.IBAN,
    maximum: MAXIMUM_CHARACTERS.IBAN,
  });
};

export default ibanValidation;
