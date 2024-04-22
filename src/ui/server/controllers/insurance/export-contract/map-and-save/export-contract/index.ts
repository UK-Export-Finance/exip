import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/export-contract';
import save from '../../save-data/export-contract';
import { Application, Country, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave
 * Map and save any valid export contract fields
 * @param {RequestBody} formBody: Form body
 * @param {Application}
 * @param {Object} Validation errors
 * @returns {Boolean}
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
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving application %O', err);

    return false;
  }
};

export default {
  exportContract,
};
