import { MAXIMUM_CHARACTERS, MINIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import numberMinimumMaximumLength from '../../../../../../shared-validation/number-minimum-maximum-length';
import { RequestBody } from '../../../../../../../types';

const { ACCOUNT_NUMBER: FIELD_ID } = FIELD_IDS.LOSS_PAYEE_FINANCIAL_UK;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

export const MAXIMUM = Number(MAXIMUM_CHARACTERS.ACCOUNT_NUMBER);

export const MINIMUM = Number(MINIMUM_CHARACTERS.ACCOUNT_NUMBER);

/**
 * accountNumberRules
 * Check submitted form data for errors for the account number field
 * Returns numberAboveMinimumValidation if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} numberMinimumMaximumLength errors
 */
const accountNumberRules = (formBody: RequestBody, errors: object) =>
  numberMinimumMaximumLength({ formBody, fieldId: FIELD_ID, errorMessage: ERROR_MESSAGES_OBJECT, errors, minimum: MINIMUM, maximum: MAXIMUM });

export default accountNumberRules;
