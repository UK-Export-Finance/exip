import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/policy';
import save from '../../save-data/policy';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave
 * Map and save any valid  policy fields
 * @param {RequestBody} formBody: Form body
 * @param {Application} application
 * @param {object} validationErrors: Validation errors
 * @returns {boolean}
 */
const policy = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const populatedData = mapSubmittedData(formBody, application);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.policy(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.policy(application, populatedData);
      }

      if (!saveResponse) {
        console.error('No save response received from save.policy %s', application.id);

        return false;
      }

      return true;
    }

    return true;
  } catch (error) {
    console.error('Error mapping and saving application - policy %o', error);

    return false;
  }
};

export default {
  policy,
};
