import { FIELD_IDS } from '../../constants';
import { ERROR_MESSAGES } from '../../content-strings';
import generateValidationErrors from '../../helpers/validation';
import { objectHasValues, objectHasProperty } from '../../helpers/object';
import { RequestBody } from '../../../types';

const validation = (formBody: RequestBody) => {
  let errors;

  const hasErrors = !objectHasValues(formBody) || !objectHasProperty(formBody, FIELD_IDS.VALID_EXPORTER_LOCATION);

  if (hasErrors) {
    errors = generateValidationErrors(FIELD_IDS.VALID_EXPORTER_LOCATION, ERROR_MESSAGES[FIELD_IDS.VALID_EXPORTER_LOCATION]);

    return errors;
  }

  return null;
};

export default validation;
