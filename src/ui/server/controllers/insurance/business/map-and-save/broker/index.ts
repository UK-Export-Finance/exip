import hasFormData from '../../../../../helpers/has-form-data';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';
import save from '../../save-data/broker';

/**
 * maps broker request and calls save function
 * returns true or false based on response from save function
 * @param {RequestBody} formBody
 * @param {Object} application
 * @param {Object} validationErrors
 * @returns {Boolean}
 */
const broker = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      // maps through formBody and puts fields in correct format
      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.broker(application, formBody, validationErrors.errorList);
      } else {
        saveResponse = await save.broker(application, formBody);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving business - broker section of application %O', err);
    return false;
  }
};

export default { broker };
