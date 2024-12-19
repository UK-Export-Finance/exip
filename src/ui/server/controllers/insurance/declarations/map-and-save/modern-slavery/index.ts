import hasFormData from '../../../../../helpers/has-form-data';
import save from '../../save-data/modern-slavery';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave
 * Map and save any valid modern slavery fields
 * @param {RequestBody} formBody: Form body
 * @param {Application} application
 * @param {Object} validationErrors: Validation errors
 * @returns {Promise<Boolean>}
 */
const declarationModernSlavery = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.declarationModernSlavery(application, formBody, validationErrors.errorList);
      } else {
        saveResponse = await save.declarationModernSlavery(application, formBody);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (error) {
    console.error('Error mapping and saving application %o', error);

    return false;
  }
};

export default {
  declarationModernSlavery,
};
