import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../../types';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';

const { FINANCIAL_ADDRESS: FIELD_ID } = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

export const MAXIMUM = Number(MAXIMUM_CHARACTERS.FULL_ADDRESS);

/**
 * financialAddressRule
 * validates financial address field
 * checks if response has been provided and not above maximum
 * Returns providedAndMaxLength if there are any errors.
 * @param {RequestBody} formBody
 * @param {Object} errors
 * @returns {Object} providedAndMaxLength errors
 */
const financialAddressRule = (formBody: RequestBody, errors: object) => providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM);

export default financialAddressRule;
