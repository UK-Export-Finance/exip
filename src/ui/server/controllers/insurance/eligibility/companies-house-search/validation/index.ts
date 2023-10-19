import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../content-strings/error-messages';
import emptyFieldValidation from '../../../../../shared-validation/empty-field';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';
import { RequestBody, ValidationErrors } from '../../../../../../types';

const {
  ELIGIBILITY: { COMPANIES_HOUSE_NUMBER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  ELIGIBILITY: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validation
 * Crates an array of rules with 1 rule for "companies house number".
 * The rules are then passed to combineValidationRules to return a result.
 * @param {Express.Request.body}
 * @returns {object} object containing errors from emptyFieldValidation, or a blank object
 */
const validation = (formBody: RequestBody): ValidationErrors => {
  const emptyRuleFunction = (body: RequestBody) => emptyFieldValidation(body, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, {});

  const rules = [emptyRuleFunction] as Array<() => ValidationErrors>;

  return combineValidationRules(rules, formBody) as ValidationErrors;
};

export default validation;
