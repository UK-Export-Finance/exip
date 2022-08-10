import { FIELD_IDS } from '../../../../constants';
import { ERROR_MESSAGES } from '../../../../content-strings';
import { isSinglePolicyType, isMultiPolicyType } from '../../../../helpers/policy-type';
import generateValidationErrors from '../../../../helpers/validation';
import { objectHasProperty } from '../../../../helpers/object';
import { numberHasDecimal } from '../../../../helpers/number';
import { stripCommas } from '../../../../helpers/string';
import { RequestBody } from '../../../../../types';

const MINIMUM = 1;

const hasDisllowedCharacters = (str: string) => {
  const disllowedValues = str.replace(/[0-9,]/g, '');

  if (disllowedValues.length) {
    return true;
  }

  return false;
};

const costRules = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  let fieldId!: string;

  if (isSinglePolicyType(formBody[FIELD_IDS.POLICY_TYPE])) {
    fieldId = FIELD_IDS.CONTRACT_VALUE;
  }

  if (isMultiPolicyType(formBody[FIELD_IDS.POLICY_TYPE])) {
    fieldId = FIELD_IDS.MAX_AMOUNT_OWED;
  }

  if (!objectHasProperty(formBody, fieldId)) {
    updatedErrors = generateValidationErrors(fieldId, ERROR_MESSAGES[fieldId].IS_EMPTY, errors);

    return updatedErrors;
  }

  if (numberHasDecimal(formBody[fieldId])) {
    updatedErrors = generateValidationErrors(fieldId, ERROR_MESSAGES[fieldId].NOT_A_WHOLE_NUMBER, errors);

    return updatedErrors;
  }

  if (hasDisllowedCharacters(formBody[fieldId])) {
    updatedErrors = generateValidationErrors(fieldId, ERROR_MESSAGES[fieldId].NOT_A_NUMBER, errors);

    return updatedErrors;
  }

  const cleanString = stripCommas(formBody[fieldId]);

  if (Number(cleanString) < MINIMUM) {
    updatedErrors = generateValidationErrors(fieldId, ERROR_MESSAGES[fieldId].BELOW_MINIMUM, errors);

    return updatedErrors;
  }

  return updatedErrors;
};

export { hasDisllowedCharacters, costRules };
