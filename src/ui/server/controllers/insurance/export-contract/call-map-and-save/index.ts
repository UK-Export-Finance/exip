import mapAndSave from '../map-and-save';
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
      saveResponse = await mapAndSave.exportContract(formData, application, validationErrors);

      return saveResponse;
    }

    saveResponse = await mapAndSave.exportContract(formData, application);

    return saveResponse;
  } catch (err) {
    console.error('Error calling mapAndSave.exportContract %O', err);

    return false;
  }
};

export default callMapAndSave;
