import { FIELD_IDS, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';

const {
  INSURANCE: {
    YOUR_BUYER: { CONNECTION_WITH_BUYER_DESCRIPTION: FIELD_ID, CONNECTION_WITH_BUYER },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

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
    return providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM_CHARACTERS.CONNECTION_WITH_BUYER_DESCRIPTION);
  }

  return errors;
};

export default connectionWithBuyerDescriptionRule;
