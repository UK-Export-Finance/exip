import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/agent';
import saveAgent from '../../save-data/export-contract-agent';
import shouldNullifyAgentServiceData from '../../../../../helpers/should-nullify-agent-service-data';
import nullify from '../nullify-export-contract-agent-service';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave
 * Map and save any valid "export contract agent" fields
 * If the form is submitted with the "using agent" as false (USING_AGENT),
 * and if AGENT_SERVICE data exists in the application, nullify all AGENT_SERVICE and AGENT_CHARGES data.
 * @param {RequestBody} formBody: Form body
 * @param {Application}
 * @param {Object} Validation errors
 * @returns {Promise<Boolean>}
 */
const exportContractAgent = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const { isUsingAgent } = formBody;

      const populatedData = mapSubmittedData(formBody);

      let saveResponse;

      if (validationErrors) {
        saveResponse = await saveAgent.exportContractAgent(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await saveAgent.exportContractAgent(application, populatedData);
      }

      if (!saveResponse) {
        return false;
      }

      /**
       * If AGENT_SERVICE data should be nullified,
       * Nullify and save all AGENT_CHARGES and AGENT_SERVICE data.
       */
      if (shouldNullifyAgentServiceData(isUsingAgent, application.exportContract.agent)) {
        saveResponse = await nullify.exportContractAgentServiceAndCharge(application);

        if (!saveResponse) {
          return false;
        }
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
