import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  INSURANCE: {
    YOUR_BUYER: { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: FIELD_ID },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

/**
 * creditInsuranceCoverRule
 * Check submitted form data to see if credit insurance cover field radio is selected
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const creditInsuranceCoverRule = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default creditInsuranceCoverRule;
