import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../types';

const { PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: FIELD_ID, HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

/**
 * creditInsuranceCoverDescriptionRule
 * Check submitted form data to see if credit insurance cover field radio is selected
 * Returns generateValidationErrors if input is empty.
 * Returns inputValidation if field is not empty
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const creditInsuranceCoverDescriptionRule = (formBody: RequestBody, errors: object) => {
  if (formBody[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER] === 'true') {
    return providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM_CHARACTERS.BUYER_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER);
  }

  return errors;
};

export default creditInsuranceCoverDescriptionRule;
