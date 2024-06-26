import hasFormData from '../../../../../helpers/has-form-data';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';
import mapNatureOfBusinessSubmittedData from '../../nature-of-business/map-submitted-data';
import save from '../../save-data/business';

/**
 * maps nature of business request and calls save function
 * returns true or false based on response from save function
 * @param {RequestBody} formBody
 * @param {Object} application
 * @param {Object} validationErrors
 * @returns {Boolean}
 */
const natureOfBusiness = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      // maps through formBody and puts fields in correct format
      const dataToSave = mapNatureOfBusinessSubmittedData(formBody);
      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.business(application, dataToSave, validationErrors.errorList);
      } else {
        saveResponse = await save.business(application, dataToSave);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving business section of application %O', err);
    return false;
  }
};

export default { natureOfBusiness };
