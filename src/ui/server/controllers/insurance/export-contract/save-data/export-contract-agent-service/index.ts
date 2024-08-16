import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';

/**
 * exportContractAgentService
 * Strip invalid fields from submitted form data and update the application.
 * This is used for any save functionality in the "Export contract agent service" section of the application.
 * @param {Application} application
 * @param {Express.Request.body} formBody
 * @param {Object} errorList: Field error list
 * @returns {Promise<Object>} Saved data
 */
const exportContractAgentService = async (application: Application, formBody: RequestBody, errorList?: object) => {
  const dataToSave = getDataToSave(formBody, errorList);

  const sanitisedData = sanitiseData(dataToSave);

  // send the form data to the API for database update.
  const exportContractAgentServiceId = application.exportContract.agent.service.id;

  try {
    const saveResponse = await api.keystone.application.update.exportContractAgentService(exportContractAgentServiceId, sanitisedData);

    return saveResponse;
  } catch (error) {
    throw new Error("Updating application's exportContractAgentService");
  }
};

export default {
  exportContractAgentService,
};
