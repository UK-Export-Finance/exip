import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { isSinglePolicyType } from '../../../../../helpers/policy-type';
import generateValidationErrors from '../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../helpers/object';
import { isNumber, numberHasDecimal } from '../../../../../helpers/number';
import { RequestBody } from '../../../../../../types';

const MINIMUM = 1;
const SINGLE_POLICY_MAX_MONTHS = 22;

const { POLICY_TYPE, POLICY_LENGTH: FIELD_ID } = FIELD_IDS;

const ERROR_MESSAGE = ERROR_MESSAGES.ELIGIBILITY[FIELD_ID];

const policyLengthRules = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;
  const isSinglePolicy = isSinglePolicyType(formBody[POLICY_TYPE]);

  if (objectHasProperty(formBody, POLICY_TYPE) && isSinglePolicy) {
    if (!objectHasProperty(formBody, FIELD_ID)) {
      const errorMessage = ERROR_MESSAGES.ELIGIBILITY[FIELD_ID].IS_EMPTY;

      updatedErrors = generateValidationErrors(FIELD_ID, errorMessage, errors);

      return updatedErrors;
    }

    const submittedValue = formBody[FIELD_ID];

    if (numberHasDecimal(submittedValue)) {
      updatedErrors = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.NOT_A_WHOLE_NUMBER, updatedErrors);

      return updatedErrors;
    }

    if (!isNumber(submittedValue)) {
      updatedErrors = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.NOT_A_NUMBER, updatedErrors);

      return updatedErrors;
    }

    if (Number(submittedValue) < MINIMUM) {
      updatedErrors = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BELOW_MINIMUM, updatedErrors);

      return updatedErrors;
    }

    if (Number(submittedValue) > SINGLE_POLICY_MAX_MONTHS) {
      updatedErrors = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, updatedErrors);

      return updatedErrors;
    }
  }

  return updatedErrors;
};

export default policyLengthRules;
