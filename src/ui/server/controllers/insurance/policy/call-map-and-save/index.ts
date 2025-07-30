import mapAndSave from '../map-and-save/policy';
import { Application, RequestBody, ValidationErrors } from '../../../../../types';

/**
 * callMapAndSave
 * Call the "map and save" function with or without validation errors
 * @param {RequestBody} Form body
 * @param {Application} application
 * @param {object} Form Validation errors
 * @returns {boolean}
 */
const callMapAndSave = async (formData: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    let saveResponse;

    if (validationErrors) {
      saveResponse = await mapAndSave.policy(formData, application, validationErrors);

      return saveResponse;
    }

    saveResponse = await mapAndSave.policy(formData, application);

    return saveResponse;
  } catch (error) {
    console.error('Error calling mapAndSave.policy %o', error);

    return false;
  }
};

export default callMapAndSave;
