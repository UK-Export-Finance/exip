import { APPLICATION, FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import wholeNumberValidation from '../../../../../../helpers/whole-number-validation';
import { stripCommas } from '../../../../../../helpers/string';
import { RequestBody } from '../../../../../../../types';

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        MULTIPLE: { MAXIMUM_BUYER_WILL_OWE: FIELD_ID },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        MULTIPLE: { [FIELD_ID]: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

const MINIMUM = 1;
const MAXIMUM = APPLICATION.POLICY.MAXIMUM_BUYER_CAN_OWE;

/**
 * maximumBuyerWillOweRules
 * Check submitted form data for errors with the maximum buyer will owe field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const maximumBuyerWillOweRules = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  // check if the field is empty.
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, errors);
  }

  // check if the field is a whole number.
  updatedErrors = wholeNumberValidation(formBody, updatedErrors, ERROR_MESSAGE.INCORRECT_FORMAT, FIELD_ID);

  // strip commas - commas are valid.
  const numberWithoutCommas = stripCommas(formBody[FIELD_ID]);

  // check if the field is below the minimum
  if (Number(numberWithoutCommas) < MINIMUM) {
    updatedErrors = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BELOW_MINIMUM, errors);
  }

  // check if the field is above the maximum
  if (Number(numberWithoutCommas) > MAXIMUM) {
    updatedErrors = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, errors);
  }

  return updatedErrors;
};

export default maximumBuyerWillOweRules;
