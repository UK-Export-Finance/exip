import hasFormData from '../../../../../helpers/has-form-data';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';
import mapTurnoverSubmittedData from '../../turnover/map-submitted-data';
import business from '../../save-data/business';

/**
 * maps turnover request and calls save function
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
      const dataToSave = mapTurnoverSubmittedData(formBody);
      let saveResponse;

      if (validationErrors) {
        saveResponse = await business.save(application, dataToSave, validationErrors.errorList);
      } else {
        saveResponse = await business.save(application, dataToSave);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving business section of application', { err });
    return false;
  }
};

export default { mapAndSave };
