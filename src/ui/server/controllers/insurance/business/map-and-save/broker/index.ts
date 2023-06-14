import hasFormData from '../../../../../helpers/has-form-data';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';
import broker from '../../save-data/broker';

/**
 * maps broker request and calls save function
 * returns true or false based on response from save function
 * @param {RequestBody} formBody
 * @param {Object} application
 * @param {Object} validationErrors
 * @returns {Boolean}
 */
const mapAndSave = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      // maps through formBody and puts fields in correct format
      let saveResponse;

      if (validationErrors) {
        saveResponse = await broker.save(application, formBody, validationErrors.errorList);
      } else {
        saveResponse = await broker.save(application, formBody);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving broker section of application', { err });
    return false;
  }
};

export default { mapAndSave };
