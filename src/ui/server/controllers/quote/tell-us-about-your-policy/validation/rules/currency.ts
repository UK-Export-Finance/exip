import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../helpers/object';
import { RequestBody } from '../../../../../../types';

const currencyRules = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, FIELD_IDS.CURRENCY)) {
    updatedErrors = generateValidationErrors(FIELD_IDS.CURRENCY, ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY, errors);
  }

  return updatedErrors;
};

export default currencyRules;
