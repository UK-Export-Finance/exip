import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import numberHyphenSpacesOnlyValidation from '../../../../../../shared-validation/number-hyphen-and-spaces-only';
import { POLICY_FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { RequestBody } from '../../../../../../../types';

const { SORT_CODE: FIELD_ID } = FIELD_IDS.LOSS_PAYEE_FINANCIAL_UK;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

export const MAXIMUM = Number(POLICY_FIELDS.LOSS_PAYEE_FINANCIAL_UK[FIELD_ID].MAXIMUM);

export const MINIMUM = Number(POLICY_FIELDS.LOSS_PAYEE_FINANCIAL_UK[FIELD_ID].MINIMUM);

/**
 * sortCodeRules
 * Check submitted form data for errors for the sort code field
 * Returns wholeNumberAboveMinimumValidation if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const sortCodeRules = (formBody: RequestBody, errors: object) =>
  numberHyphenSpacesOnlyValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MINIMUM, MAXIMUM);

export default sortCodeRules;
