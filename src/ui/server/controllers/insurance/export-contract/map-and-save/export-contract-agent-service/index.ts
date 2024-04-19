import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import hasFormData from '../../../../../helpers/has-form-data';
import saveService from '../../save-data/export-contract-agent-service';
import shouldNullifyAgentServiceChargeData from '../../../../../helpers/should-nullify-agent-service-charge-data';
import saveCharge from '../../save-data/export-contract-agent-service-charge';
import { Application, RequestBody, ValidationErrors } from '../../../../../../types';

const {
  AGENT_CHARGES: { CHARGE_PERCENTAGE, FIXED_SUM_AMOUNT, METHOD, PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

/**
 * mapAndSave
 * Map and save any valid "export contract agent service charge" fields
 * @param {Express.Request.body} Express request body
 * @param {Application}
 * @param {Object} Validation errors
 * @returns {Boolean}
 */
const exportContractAgentService = async (formBody: RequestBody, application: Application, validationErrors?: ValidationErrors) => {
  try {
    if (hasFormData(formBody)) {
      let saveResponse;

      if (validationErrors) {
        saveResponse = await saveService.exportContractAgentService(application, formBody, validationErrors.errorList);
      } else {
        saveResponse = await saveService.exportContractAgentService(application, formBody);
      }

      if (!saveResponse) {
        return false;
      }

      const {
        exportContract: {
          agent: {
            service: { charge },
          },
        },
      } = application;

      if (shouldNullifyAgentServiceChargeData(formBody, charge)) {
        const nullifiedAgentCharges = {
          [CHARGE_PERCENTAGE]: null,
          [FIXED_SUM_AMOUNT]: null,
          [METHOD]: null,
          [PAYABLE_COUNTRY_CODE]: '',
        };

        saveResponse = await saveCharge.exportContractAgentServiceCharge(application, nullifiedAgentCharges);

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
