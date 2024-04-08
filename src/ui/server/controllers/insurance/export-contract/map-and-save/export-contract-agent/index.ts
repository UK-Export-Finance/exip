import hasFormData from '../../../../../helpers/has-form-data';
import save from '../../save-data/export-contract-agent';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave
 * Map and save any valid "export contract agent" fields
 * @param {Express.Request.body} Express request body
 * @param {Application}
 * @param {Object} Validation errors
 * @returns {Boolean}
 */
const exportContractAgent = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.exportContractAgent(application, formBody, validationErrors.errorList);
      } else {
        saveResponse = await save.exportContractAgent(application, formBody);
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
  exportContractAgent,
};
