import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/private-market';
import save from '../../save-data/private-market';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave
 * Map and save any valid private market fields
 * @param {RequestBody} formBody: Form body
 * @param {Application} application
 * @param {object} validationErrors: Validation errors
 * @returns {Promise<boolean>}
 */
const privateMarket = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const populatedData = mapSubmittedData(formBody);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.privateMarket(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.privateMarket(application, populatedData);
      }

      if (!saveResponse) {
        console.error('No save response received from save.privateMarket %s', application.id);

        return false;
      }

      return true;
    }

    return true;
  } catch (error) {
    console.error('Error mapping and saving application %o', error);

    return false;
  }
};

export default {
  privateMarket,
};
