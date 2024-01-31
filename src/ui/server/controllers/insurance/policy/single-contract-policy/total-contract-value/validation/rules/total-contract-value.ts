import { APPLICATION } from '../../../../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../../../helpers/object';
import wholeNumberValidation from '../../../../../../../helpers/whole-number-validation';
import { RequestBody } from '../../../../../../../../types';
import wholeNumberAboveMinimumValidation from '../../../../../../../shared-validation/whole-number-above-minimum';

const { MINIMUM } = APPLICATION.POLICY.TOTAL_VALUE_OF_CONTRACT;

const {
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { TOTAL_CONTRACT_VALUE: FIELD_ID },
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        SINGLE: { [FIELD_ID]: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

/**
 * totalContractValueRules
 * Check submitted form data for errors with the total contract value field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const totalContractValueRules = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  // check if the field is empty.
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, errors);
  }

  // check if the field is a whole number.
  updatedErrors = wholeNumberValidation(formBody, updatedErrors, ERROR_MESSAGE.INCORRECT_FORMAT, FIELD_ID);

  // checks if value is below minimum
  const belowMinimum = wholeNumberAboveMinimumValidation(formBody, FIELD_ID, ERROR_MESSAGE.BELOW_MINIMUM, errors, MINIMUM);

  if (belowMinimum) {
    return belowMinimum;
  }

  return updatedErrors;
};

export default totalContractValueRules;
