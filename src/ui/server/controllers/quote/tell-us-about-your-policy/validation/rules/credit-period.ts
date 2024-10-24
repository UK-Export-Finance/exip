import { FIELD_IDS, MINIMUM_CHARACTERS, MAXIMUM_CHARACTERS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';
import { isMultiplePolicyType } from '../../../../../helpers/policy-type';
import { objectHasProperty } from '../../../../../helpers/object';
import { RequestBody } from '../../../../../../types';

const {
  ELIGIBILITY: { CREDIT_PERIOD },
  POLICY_TYPE,
} = FIELD_IDS;

const MINIMUM = MINIMUM_CHARACTERS.QUOTE.CREDIT_PERIOD;
const MAXIMUM = MAXIMUM_CHARACTERS.QUOTE.CREDIT_PERIOD;

const creditPeriodRules = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  if (isMultiplePolicyType(formBody[POLICY_TYPE])) {
    if (!objectHasProperty(formBody, CREDIT_PERIOD)) {
      updatedErrors = generateValidationErrors(CREDIT_PERIOD, ERROR_MESSAGES.ELIGIBILITY[CREDIT_PERIOD].IS_EMPTY, errors);

      return updatedErrors;
    }

    if (Number(formBody[CREDIT_PERIOD]) < MINIMUM) {
      updatedErrors = generateValidationErrors(CREDIT_PERIOD, ERROR_MESSAGES.ELIGIBILITY[CREDIT_PERIOD].BELOW_MINIMUM, errors);

      return updatedErrors;
    }

    if (Number(formBody[CREDIT_PERIOD]) > MAXIMUM) {
      updatedErrors = generateValidationErrors(CREDIT_PERIOD, ERROR_MESSAGES.ELIGIBILITY[CREDIT_PERIOD].ABOVE_MAXIMUM, errors);

      return updatedErrors;
    }
  }

  return updatedErrors;
};

export default creditPeriodRules;
