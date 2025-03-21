import nullifyAgentServiceData from '../../../../../helpers/nullify-agent-service-data';
import nullifyAgentServiceChargeData from '../../../../../helpers/nullify-agent-service-charge-data';
import saveAgentService from '../../save-data/export-contract-agent-service';
import saveAgentServiceCharge from '../../save-data/export-contract-agent-service-charge';
import { Application } from '../../../../../../types';

/**
 * exportContractAgentServiceAndCharge
 * Nullify Export contract "agent service" and "agent service charge" data.
 * @param {Application} application
 * @returns {Promise<boolean>}
 */
const exportContractAgentServiceAndCharge = async (application: Application) => {
  try {
    console.info('Mapping and saving application - export contract agent - nullifying agent service and charge data');

    const nullified = {
      service: nullifyAgentServiceData(),
      serviceCharge: nullifyAgentServiceChargeData(),
    };

    console.info('Mapping and saving application - export contract agent - nullifying agent service charge data');

    let saveResponse = await saveAgentServiceCharge.exportContractAgentServiceCharge(application, nullified.serviceCharge);

    if (!saveResponse) {
      console.error('No save response received from saveAgentServiceCharge.exportContractAgentServiceCharge %s', application.id);

      return false;
    }

    console.info('Mapping and saving application - export contract agent - nullifying agent service data');

    saveResponse = await saveAgentService.exportContractAgentService(application, nullified.service);

    if (!saveResponse) {
      console.error('No save response received from saveAgentService.exportContractAgentService %s', application.id);

      return false;
    }

    return saveResponse;
  } catch (error) {
    console.error('Error mapping and saving application - export contract agent - nullifying agent service and charge data %o', error);

    return false;
  }
};

export default {
  exportContractAgentServiceAndCharge,
};
