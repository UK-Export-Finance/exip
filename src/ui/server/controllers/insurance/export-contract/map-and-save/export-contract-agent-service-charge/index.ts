import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/agent-service-charge';
import save from '../../save-data/export-contract-agent-service-charge';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave
 * Map and save any valid "export contract agent service charge" fields
 * @param {RequestBody} formBody: Form body
 * @param {Application} application
 * @param {object} validationErrors: Validation errors
 * @returns {Promise<boolean>}
 */
const exportContractAgentServiceCharge = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const populatedData = mapSubmittedData(formBody);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await save.exportContractAgentServiceCharge(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await save.exportContractAgentServiceCharge(application, populatedData);
      }

      if (!saveResponse) {
        console.error('No save response received from save.exportContractAgentServiceCharge %s', application.id);

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
  exportContractAgentServiceCharge,
};
