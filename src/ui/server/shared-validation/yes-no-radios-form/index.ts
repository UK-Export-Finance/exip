import generateValidationErrors from '../../helpers/validation';
import { objectHasKeysAndValues, objectHasProperty } from '../../helpers/object';
import { RequestBody } from '../../../types';

const validation = (formBody: RequestBody, fieldId: string, errorMessage: string) => {
  let errors;

  const hasErrors = !objectHasKeysAndValues(formBody) || !objectHasProperty(formBody, fieldId);

  if (hasErrors) {
    errors = generateValidationErrors(fieldId, errorMessage);

    return errors;
  }

  return errors;
};

export default validation;
