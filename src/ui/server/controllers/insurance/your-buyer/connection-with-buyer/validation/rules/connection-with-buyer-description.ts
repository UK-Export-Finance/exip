import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';
import generateValidationErrors from '../../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../../helpers/object';
import maxLengthValidation from '../../../../../../shared-validation/max-length';

const {
  INSURANCE: {
    YOUR_BUYER: { CONNECTION_WITH_BUYER_DESCRIPTION: FIELD_ID, CONNECTION_WITH_BUYER },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

const MAXIMUM = 1000;

/**
 * connectionWithBuyerDescriptionRule
 * Check submitted form data to see if connected to the buyer field radio is selected
 * Returns generateValidationErrors if input is empty.
 * Returns inputValidation if field is not empty
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const connectionWithBuyerDescriptionRule = (formBody: RequestBody, errors: object) => {
  if (formBody[CONNECTION_WITH_BUYER] === 'true') {
    if (!objectHasProperty(formBody, FIELD_ID)) {
      return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
    }

    return maxLengthValidation(formBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, errors, MAXIMUM);
  }

  return errors;
};

export default connectionWithBuyerDescriptionRule;
