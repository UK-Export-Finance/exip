import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../helpers/object';
import { RequestBody, ValidationErrors } from '../../../../../../types';

const { CURRENCY } = FIELD_IDS.ELIGIBILITY;

const currencyRules = (formBody: RequestBody, errors: object): ValidationErrors => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, CURRENCY)) {
    updatedErrors = generateValidationErrors(CURRENCY, ERROR_MESSAGES.ELIGIBILITY[CURRENCY].IS_EMPTY, errors);
  }

  return updatedErrors;
};

export default currencyRules;
