import hasFormData from '../../../../../helpers/has-form-data';
import mapSubmittedData from '../../map-submitted-data/agent-service';
import saveService from '../../save-data/export-contract-agent-service';
import shouldNullifyAgentServiceChargeData from '../../../../../helpers/should-nullify-agent-service-charge-data';
import nullifyAgentServiceChargeData from '../../../../../helpers/nullify-agent-service-charge-data';
import saveCharge from '../../save-data/export-contract-agent-service-charge';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

/**
 * mapAndSave
 * Map and save any valid "export contract agent service charge" fields.
 * If the form is submitted with the "agent charging" as false (IS_CHARGING),
 * and AGENT_CHARGES data exists in the application,
 * Nullify all AGENT_CHARGES data.
 * @param {RequestBody} formBody: Form body
 * @param {Application}
 * @param {Object} Validation errors
 * @returns {Boolean}
 */
const exportContractAgentService = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      const populatedData = mapSubmittedData(formBody);

      let saveResponse;

      /**
       * If validation errors, save the data with only valid data.
       * Otherwise, simply save all data.
       */
      if (validationErrors) {
        saveResponse = await saveService.exportContractAgentService(application, populatedData, validationErrors.errorList);
      } else {
        saveResponse = await saveService.exportContractAgentService(application, populatedData);
      }

      if (!saveResponse) {
        return false;
      }

      /**
       * If AGENT_CHARGES data should be nullified,
       * Nullify and save the data.
       */
      if (shouldNullifyAgentServiceChargeData(populatedData, application.exportContract.agent.service.charge)) {
        const nullifiedData = nullifyAgentServiceChargeData();

        saveResponse = await saveCharge.exportContractAgentServiceCharge(application, nullifiedData);

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
  exportContractAgentService,
};
