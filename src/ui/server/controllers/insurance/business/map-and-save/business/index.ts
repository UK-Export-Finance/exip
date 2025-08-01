import hasFormData from '../../../../../helpers/has-form-data';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';
import mapSubmittedData from '../../map-submitted-data/your-business';
import save from '../../save-data/business';

/**
 * maps business data and calls save function
 * returns true or false based on response from save function
 * @param {RequestBody} formBody
 * @param {object} application
 * @param {object} validationErrors
 * @returns {boolean}
 */
const business = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const dataToSave = mapSubmittedData(formBody);
      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.business(application, dataToSave, validationErrors.errorList);
      } else {
        saveResponse = await save.business(application, dataToSave);
      }

      if (!saveResponse) {
        console.error('No save response received from save.business %s', application.id);

        return false;
      }

      return true;
    }

    return true;
  } catch (error) {
    console.error('Error mapping and saving business section of application %o', error);

    return false;
  }
};

export default { business };
