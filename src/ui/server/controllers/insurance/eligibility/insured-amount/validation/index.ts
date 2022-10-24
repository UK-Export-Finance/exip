import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';
import { objectHasValues, objectHasProperty } from '../../../../../helpers/object';
import { RequestBody } from '../../../../../../types';

const validation = (formBody: RequestBody) => {
  let errors;

  const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_FOR_MORE_THAN_MAX_PERIOD;

  const hasErrors = !objectHasValues(formBody) || !objectHasProperty(formBody, FIELD_ID);

  if (hasErrors) {
    errors = generateValidationErrors(FIELD_ID, ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY);

    return errors;
  }

  return null;
};

export default validation;
