import FIELD_IDS from '../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../content-strings';
import fullAddressValidation from '../full-address';
import { RequestBody } from '../../../types';

const { FINANCIAL_ADDRESS: FIELD_ID } = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * financialAddressRule
 * Validate a "financial address" field
 * @param {RequestBody} formBody: Form body
 * @param {Object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} fullAddressValidation
 */
const financialAddress = (formBody: RequestBody, errors: object) => {
  return fullAddressValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors);
};

export default financialAddress;
