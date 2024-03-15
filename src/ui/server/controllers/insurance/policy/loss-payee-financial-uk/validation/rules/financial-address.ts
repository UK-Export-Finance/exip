import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../../types';
import fullAddressValidation from '../../../../../../shared-validation/full-address';

const { FINANCIAL_ADDRESS: FIELD_ID } = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * financialAddressRule
 * validates financial address field
 * checks if response has been provided and not above maximum
 * Returns fullAddressValidation if there are any errors.
 * @param {RequestBody} formBody
 * @param {Object} errors
 * @returns {Object} fullAddressValidation errors
 */
const financialAddressRule = (formBody: RequestBody, errors: object) => fullAddressValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors);

export default financialAddressRule;
