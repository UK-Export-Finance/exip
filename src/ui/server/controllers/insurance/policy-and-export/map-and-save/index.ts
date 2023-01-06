import hasFormData from '../../../../helpers/has-form-data';
import mapSubmittedData from '../map-submitted-data';
import save from '../save-data';
import { Application, RequestBody, ValidationErrors } from '../../../../../types';

/**
 * mapAndSave
 * Map and save any valid Single contract policy fields
 * @param {Express.Request.body} Express request body
 * @param {Object} Application
 * @param {Object} Validation errors
 * @returns {Boolean}
 */
const policyAndExport = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const populatedData = mapSubmittedData(formBody);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.policyAndExport(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.policyAndExport(application, populatedData);
      }

      if (!saveResponse) {
        return false;
      }

      return true;
    }

    return true;
  } catch (err) {
    console.error('Error mapping and saving application', { err });

    return false;
  }
};

export default {
  policyAndExport,
};
