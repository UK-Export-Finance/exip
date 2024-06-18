import { MAXIMUM_CHARACTERS, MINIMUM_CHARACTERS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import numberHyphenSpacesOnlyValidation from '../../../../../../shared-validation/number-hyphen-and-spaces-only';
import { RequestBody } from '../../../../../../../types';

const { SORT_CODE: FIELD_ID } = FIELD_IDS.LOSS_PAYEE_FINANCIAL_UK;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * sortCodeRules
 * Check submitted form data for errors for the sort code field
 * Returns numberHyphenSpacesOnlyValidation if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} numberHyphenSpacesOnlyValidation errors
 */
const sortCodeRules = (formBody: RequestBody, errors: object) =>
  numberHyphenSpacesOnlyValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MINIMUM_CHARACTERS.SORT_CODE, MAXIMUM_CHARACTERS.SORT_CODE);

export default sortCodeRules;
