import mapAndSave from '../map-and-save/policy';
import { Application, RequestBody, ValidationErrors } from '../../../../../types';

/**
 * callMapAndSave
 * Call the "map and save" function with or without validation errors
 * @param {RequestBody} Form body
 * @param {Application}
 * @param {Object} Form Validation errors
 * @returns {Boolean}
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
  } catch (err) {
    console.error('Error calling mapAndSave.policy %O', err);

    return false;
  }
};

export default callMapAndSave;
