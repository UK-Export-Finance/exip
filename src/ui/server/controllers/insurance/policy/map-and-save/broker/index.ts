import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/broker';
import save from '../../save-data/broker';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * maps broker request and calls save function
 * returns true or false based on response from save function
 * @param {RequestBody} formBody
 * @param {object} application
 * @param {object} validationErrors
 * @returns {boolean}
 */
const broker = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const populatedData = mapSubmittedData(formBody, application.broker);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.broker(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.broker(application, populatedData);
      }

      if (!saveResponse) {
        console.error('No save response received from save.broker %s', application.id);

        return false;
      }

      return saveResponse;
    }

    return true;
  } catch (error) {
    console.error('Error mapping and saving application - policy - broker %o', error);

    return false;
  }
};

export default { broker };
