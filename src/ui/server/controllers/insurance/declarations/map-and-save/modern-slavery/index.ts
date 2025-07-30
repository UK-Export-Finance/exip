import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/modern-slavery';
import save from '../../save-data/modern-slavery';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave
 * Map and save any valid modern slavery fields
 * @param {RequestBody} formBody: Form body
 * @param {Application} application
 * @param {object} validationErrors: Validation errors
 * @returns {Promise<boolean>}
 */
const declarationModernSlavery = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const populatedData = mapSubmittedData(formBody);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.declarationModernSlavery(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.declarationModernSlavery(application, populatedData);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (error) {
    console.error('Error mapping and saving declaration - modern slavery %o', error);

    return false;
  }
};

export default {
  declarationModernSlavery,
};
