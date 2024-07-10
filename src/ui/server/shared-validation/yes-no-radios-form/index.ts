import generateValidationErrors from '../../helpers/validation';
import { objectHasKeysAndValues, objectHasProperty } from '../../helpers/object';
import { RequestBody } from '../../../types';

const validation = (formBody: RequestBody, fieldId: string, errorMessage: string) => {
  let errors;

  const hasErrors = !objectHasKeysAndValues(formBody) || !objectHasProperty(formBody, fieldId);

  if (hasErrors) {
    const generatedErrors = generateValidationErrors(fieldId, errorMessage);

    return generatedErrors;
  }

  return errors;
};

export default validation;
