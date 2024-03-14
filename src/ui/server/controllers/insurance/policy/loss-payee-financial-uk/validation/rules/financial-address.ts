import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../../types';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { POLICY_FIELDS } from '../../../../../../content-strings/fields/insurance/policy';

const { FINANCIAL_ADDRESS: FIELD_ID } = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

export const MAXIMUM = Number(POLICY_FIELDS.FINANCIAL_ADDRESS.MAXIMUM);

/**
 * financialAddressRule
 * validates financial address field
 * checks if response has been provided and not above maximum
 * Returns providedAndMaxLength if there are any errors.
 * @param {RequestBody} formBody
 * @param {Object} errors
 * @returns {Object} errors
 */
const financialAddressRule = (formBody: RequestBody, errors: object) => providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM);

export default financialAddressRule;
