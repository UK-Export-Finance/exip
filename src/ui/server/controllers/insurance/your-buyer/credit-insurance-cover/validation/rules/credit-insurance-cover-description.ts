import FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';
import generateValidationErrors from '../../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import maxLengthValidation from '../../../../../../shared-validation/max-length';

const { PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: FIELD_ID, HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

const MAXIMUM = 1000;

/**
 * creditInsuranceCoverDescriptionRule
 * Check submitted form data to see if credit insurance cover field radio is selected
 * Returns generateValidationErrors if input is empty.
 * Returns inputValidation if field is not empty
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const creditInsuranceCoverDescriptionRule = (formBody: RequestBody, errors: object) => {
  // if HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER radio is yes then check validation
  if (formBody[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER] === 'true') {
    if (objectHasProperty(formBody, FIELD_ID)) {
      return maxLengthValidation(formBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, errors, MAXIMUM);
    }

    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  return errors;
};

export default creditInsuranceCoverDescriptionRule;
