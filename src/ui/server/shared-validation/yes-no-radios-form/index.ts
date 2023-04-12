import generateValidationErrors from '../../helpers/validation';
import { objectHasKeysAndValues, objectHasProperty } from '../../helpers/object';
import { RequestBody } from '../../../types';

const validation = (formBody: RequestBody, fieldId: string, errorMessage: string) => {
  if (formBody && fieldId && errorMessage) {
    let errors;

    const hasErrors = !objectHasKeysAndValues(formBody) || !objectHasProperty(formBody, fieldId);

    if (hasErrors) {
      errors = generateValidationErrors(fieldId, errorMessage);

      return errors;
    }
  }

  return null;
};

export default validation;
