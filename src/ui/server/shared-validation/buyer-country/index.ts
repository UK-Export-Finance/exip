import { FIELD_IDS } from '../../constants';
import { ERROR_MESSAGES } from '../../content-strings';
import generateValidationErrors from '../../helpers/validation';
import { objectHasValues, objectHasProperty } from '../../helpers/object';
import { RequestBody } from '../../../types';

const hasErrors = (formBody: RequestBody) => {
  if (!objectHasValues(formBody)) {
    return true;
  }

  const keys = Object.keys(formBody);
  if (keys.includes(FIELD_IDS.BUYER_COUNTRY) && keys.includes(FIELD_IDS.COUNTRY)) {
    // form submitted without client side JS

    if (!objectHasProperty(formBody, FIELD_IDS.COUNTRY)) {
      return true;
    }

    return false;
  }

  if (!objectHasProperty(formBody, FIELD_IDS.BUYER_COUNTRY)) {
    // form submitted with client side JS
    return true;
  }

  return false;
};

const validation = (formBody: RequestBody) => {
  let errors;

  if (hasErrors(formBody)) {
    errors = generateValidationErrors(FIELD_IDS.COUNTRY, ERROR_MESSAGES[FIELD_IDS.COUNTRY]);

    return errors;
  }

  return null;
};

export { hasErrors, validation };
