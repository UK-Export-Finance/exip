import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  INSURANCE: {
    YOUR_BUYER: { TRADED_WITH_BUYER: FIELD_ID },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

/**
 * tradedWithBuyerRule
 * Check submitted form data to see if traded with buyer field radio is selected
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {object} errors: Errors from previous validation errors
 * @returns {ValidationErrors}
 */
const tradedWithBuyerRule = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default tradedWithBuyerRule;
