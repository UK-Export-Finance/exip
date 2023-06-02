import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { isSinglePolicyType } from '../../../../../helpers/policy-type';
import generateValidationErrors from '../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../helpers/object';
import { isNumber, numberHasDecimal } from '../../../../../helpers/number';
import { RequestBody } from '../../../../../../types';

const MINIMUM = 1;
const SINGLE_POLICY_MAX_MONTHS = 22;

const { POLICY_TYPE, SINGLE_POLICY_LENGTH } = FIELD_IDS;

const policyLengthRules = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  if (objectHasProperty(formBody, POLICY_TYPE)) {
    if (isSinglePolicyType(formBody[POLICY_TYPE])) {
      if (!objectHasProperty(formBody, SINGLE_POLICY_LENGTH)) {
        const errorMessage = ERROR_MESSAGES.ELIGIBILITY[SINGLE_POLICY_LENGTH].IS_EMPTY;

        updatedErrors = generateValidationErrors(SINGLE_POLICY_LENGTH, errorMessage, errors);

        return updatedErrors;
      }

      if (numberHasDecimal(formBody[SINGLE_POLICY_LENGTH])) {
        updatedErrors = generateValidationErrors(SINGLE_POLICY_LENGTH, ERROR_MESSAGES.ELIGIBILITY[SINGLE_POLICY_LENGTH].NOT_A_WHOLE_NUMBER, updatedErrors);

        return updatedErrors;
      }

      if (!isNumber(Number(formBody[SINGLE_POLICY_LENGTH]))) {
        updatedErrors = generateValidationErrors(SINGLE_POLICY_LENGTH, ERROR_MESSAGES.ELIGIBILITY[SINGLE_POLICY_LENGTH].NOT_A_NUMBER, updatedErrors);

        return updatedErrors;
      }

      if (Number(formBody[SINGLE_POLICY_LENGTH]) < MINIMUM) {
        updatedErrors = generateValidationErrors(SINGLE_POLICY_LENGTH, ERROR_MESSAGES.ELIGIBILITY[SINGLE_POLICY_LENGTH].BELOW_MINIMUM, updatedErrors);

        return updatedErrors;
      }

      if (Number(formBody[SINGLE_POLICY_LENGTH]) > SINGLE_POLICY_MAX_MONTHS) {
        updatedErrors = generateValidationErrors(SINGLE_POLICY_LENGTH, ERROR_MESSAGES.ELIGIBILITY[SINGLE_POLICY_LENGTH].ABOVE_MAXIMUM, updatedErrors);

        return updatedErrors;
      }
    }
  }

  return updatedErrors;
};

export default policyLengthRules;
