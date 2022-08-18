import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';
import { objectHasProperty } from '../../../../../helpers/object';
import { RequestBody } from '../../../../../../types';

const amountRules = (formBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  if (!objectHasProperty(formBody, FIELD_IDS.PERCENTAGE_OF_COVER)) {
    updatedErrors = generateValidationErrors(FIELD_IDS.PERCENTAGE_OF_COVER, ERROR_MESSAGES[FIELD_IDS.PERCENTAGE_OF_COVER].IS_EMPTY, errors);

    return updatedErrors;
  }

  return updatedErrors;
};

export default amountRules;
