import hasFormData from '../../../../../helpers/has-form-data';
import save from '../../save-data/export-contract-agent-service';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave
 * Map and save any valid "export contract agent service charge" fields
 * @param {RequestBody} formBody: Form body
 * @param {Application}
 * @param {Object} Validation errors
 * @returns {Boolean}
 */
const exportContractAgentService = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.exportContractAgentService(application, formBody, validationErrors.errorList);
      } else {
        saveResponse = await save.exportContractAgentService(application, formBody);
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
  exportContractAgentService,
};
