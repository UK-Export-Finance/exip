import hasFormData from '../../../../../helpers/has-form-data';
import save from '../../save-data/buyer';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';
import mapSubmittedData from '../../map-submitted-data/buyer';

/**
 * maps buyer request and calls save function
 * returns true or false based on response from save function
 * @param {RequestBody} formBody
 * @param {object} application
 * @param {object} validationErrors
 * @returns {boolean}
 */
const yourBuyer = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      let saveResponse;

      const populatedData = mapSubmittedData(formBody);

      if (validationErrors) {
        saveResponse = await save.buyer(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.buyer(application, populatedData);
      }

      if (!saveResponse) {
        console.error('No save response received from save.buyer %s', application.id);

        return false;
      }

      return true;
    }

    return true;
  } catch (error) {
    console.error('Error mapping and saving buyer section of application %o', error);

    return false;
  }
};

export default {
  yourBuyer,
};
