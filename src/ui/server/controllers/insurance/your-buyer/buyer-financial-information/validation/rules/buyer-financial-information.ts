import FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const { BUYER_FINANCIAL_ACCOUNTS: FIELD_ID } = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

/**
 * buyerFinancialInformationRule
 * Check submitted form data to see if buyer financial information field radio is selected
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const buyerFinancialInformationRule = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default buyerFinancialInformationRule;
