import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { isSinglePolicyType } from '../../../../../helpers/policy-type';
import generateValidationErrors from '../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../helpers/object';
import { isNumber, numberHasDecimal } from '../../../../../helpers/number';
import { RequestBody } from '../../../../../../types';

const MINIMUM = 1;
const SINGLE_POLICY_MAX_MONTHS = 22;

const { POLICY_TYPE, POLICY_LENGTH } = FIELD_IDS;

const policyLengthRules = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  if (objectHasProperty(formBody, POLICY_TYPE)) {
    if (isSinglePolicyType(formBody[POLICY_TYPE])) {
      if (!objectHasProperty(formBody, POLICY_LENGTH)) {
        const errorMessage = ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].IS_EMPTY;

        updatedErrors = generateValidationErrors(POLICY_LENGTH, errorMessage, errors);

        return updatedErrors;
      }

      if (numberHasDecimal(formBody[POLICY_LENGTH])) {
        updatedErrors = generateValidationErrors(POLICY_LENGTH, ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].NOT_A_WHOLE_NUMBER, updatedErrors);

        return updatedErrors;
      }

      if (!isNumber(Number(formBody[POLICY_LENGTH]))) {
        updatedErrors = generateValidationErrors(POLICY_LENGTH, ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].NOT_A_NUMBER, updatedErrors);

        return updatedErrors;
      }

      if (Number(formBody[POLICY_LENGTH]) < MINIMUM) {
        updatedErrors = generateValidationErrors(POLICY_LENGTH, ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].BELOW_MINIMUM, updatedErrors);

        return updatedErrors;
      }

      if (Number(formBody[POLICY_LENGTH]) > SINGLE_POLICY_MAX_MONTHS) {
        updatedErrors = generateValidationErrors(POLICY_LENGTH, ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].ABOVE_MAXIMUM, updatedErrors);

        return updatedErrors;
      }
    }
  }

  return updatedErrors;
};

export default policyLengthRules;
