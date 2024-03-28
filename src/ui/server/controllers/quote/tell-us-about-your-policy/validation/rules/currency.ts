import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import emptyFieldValidation from '../../../../../shared-validation/empty-field';
import { RequestBody, ValidationErrors } from '../../../../../../types';

const { CURRENCY: FIELD_ID } = FIELD_IDS.ELIGIBILITY;
const ERROR_MESSAGE = ERROR_MESSAGES.ELIGIBILITY[FIELD_ID];

/**
 * currencyRules
 * Returns the result of emptyFieldValidation
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const currencyRules = (formBody: RequestBody, errors: object): ValidationErrors => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default currencyRules;
