import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/export-contract';
import save from '../../save-data/export-contract';
import { Application, Country, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave
 * Map and save any valid export contract fields
 * @param {RequestBody} formBody: Form body
 * @param {Application} application
 * @param {object} validationErrors: Validation errors
 * @param {Array<Country>} countries
 * @returns {Promise<boolean>}
 */
const exportContract = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors, countries?: Array<Country>) => {
  try {
    if (hasFormData(formBody)) {
      const populatedData = mapSubmittedData(formBody, countries);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.exportContract(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.exportContract(application, populatedData);
      }

      if (!saveResponse) {
        console.error('No save response received from save.exportContract %s', application.id);

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
  exportContract,
};
