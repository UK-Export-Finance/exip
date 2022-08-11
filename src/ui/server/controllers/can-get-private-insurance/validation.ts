import { FIELD_IDS } from '../../constants';
import { ERROR_MESSAGES } from '../../content-strings';
import generateValidationErrors from '../../helpers/validation';
import { objectHasValues, objectHasProperty } from '../../helpers/object';
import { RequestBody } from '../../../types';

const validation = (formBody: RequestBody) => {
  let errors: object;

  const hasErrors = !objectHasValues(formBody) || !objectHasProperty(formBody, FIELD_IDS.CAN_GET_PRIVATE_INSURANCE);

  if (hasErrors) {
    errors = generateValidationErrors(FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES, ERROR_MESSAGES[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE]);

    return errors;
  }

  return null;
};

export default validation;
