import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../../../helpers/policy-type';
import generateValidationErrors from '../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../helpers/object';
import { numberHasDecimal } from '../../../../../helpers/number';
import { stripCommas } from '../../../../../helpers/string';
import { RequestBody } from '../../../../../../types';

const MINIMUM = 1;

const {
  ELIGIBILITY: { CONTRACT_VALUE, MAX_AMOUNT_OWED },
  POLICY_TYPE,
} = FIELD_IDS;

const hasDisallowedCharacters = (str: string) => {
  const disallowedValues = str.replace(/[0-9,]/g, '');

  if (disallowedValues.length) {
    return true;
  }

  return false;
};

const costRules = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  let fieldId!: string;

  if (isSinglePolicyType(formBody[POLICY_TYPE])) {
    fieldId = CONTRACT_VALUE;
  }

  if (isMultiplePolicyType(formBody[POLICY_TYPE])) {
    fieldId = MAX_AMOUNT_OWED;
  }

  if (!objectHasProperty(formBody, fieldId)) {
    updatedErrors = generateValidationErrors(fieldId, ERROR_MESSAGES.ELIGIBILITY[fieldId].IS_EMPTY, errors);

    return updatedErrors;
  }

  if (numberHasDecimal(formBody[fieldId])) {
    updatedErrors = generateValidationErrors(fieldId, ERROR_MESSAGES.ELIGIBILITY[fieldId].NOT_A_WHOLE_NUMBER, errors);

    return updatedErrors;
  }

  if (hasDisallowedCharacters(formBody[fieldId])) {
    updatedErrors = generateValidationErrors(fieldId, ERROR_MESSAGES.ELIGIBILITY[fieldId].NOT_A_NUMBER, errors);

    return updatedErrors;
  }

  // strip commas - commas are valid.
  const cleanString = stripCommas(formBody[fieldId]);

  if (Number(cleanString) < MINIMUM) {
    updatedErrors = generateValidationErrors(fieldId, ERROR_MESSAGES.ELIGIBILITY[fieldId].BELOW_MINIMUM, errors);

    return updatedErrors;
  }

  return updatedErrors;
};

export { hasDisallowedCharacters, costRules };
