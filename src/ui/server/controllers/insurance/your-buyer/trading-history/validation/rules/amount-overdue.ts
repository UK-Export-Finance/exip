import YOUR_BUYER_FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import wholeNumberValidation from '../../../../../../helpers/whole-number-validation';
import { stripCommas } from '../../../../../../helpers/string';
import { RequestBody } from '../../../../../../../types';

const { OUTSTANDING_PAYMENTS, AMOUNT_OVERDUE: FIELD_ID } = YOUR_BUYER_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

const MINIMUM = 1;

/**
 * amountOverdueRules
 * Check submitted form data for errors with the amount overdue field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const amountOverdueRules = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  if (formBody[OUTSTANDING_PAYMENTS] === 'true') {
    // check if the field is empty.
    if (!objectHasProperty(formBody, FIELD_ID)) {
      return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
    }

    // check if the field is a whole number.
    updatedErrors = wholeNumberValidation(formBody, updatedErrors, ERROR_MESSAGE.INCORRECT_FORMAT, FIELD_ID);

    // strip commas - commas are valid.
    const numberWithoutCommas = stripCommas(formBody[FIELD_ID]);

    // check if the field is below the minimum
    if (Number(numberWithoutCommas) < MINIMUM) {
      return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BELOW_MINIMUM, errors);
    }
  }

  return updatedErrors;
};

export default amountOverdueRules;
