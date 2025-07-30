import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';

/**
 * exportContractAgent
 * Strip invalid fields from submitted form data and update the application.
 * This is used for any save functionality in the "Export contract agent" section of the application.
 * @param {Application} application
 * @param {Express.Request.body} formBody
 * @param {object} errorList: Field error list
 * @returns {Promise<object>} Saved data
 */
const exportContractAgent = async (application: Application, formBody: RequestBody, errorList?: object) => {
  const dataToSave = getDataToSave(formBody, errorList);

  const sanitisedData = sanitiseData(dataToSave);

  // send the form data to the API for database update.
  const exportContractAgentId = application.exportContract.agent.id;

  try {
    const saveResponse = await api.keystone.application.update.exportContractAgent(exportContractAgentId, sanitisedData);

    return saveResponse;
  } catch (error) {
    throw new Error("Updating application's exportContractAgent");
  }
};

export default {
  exportContractAgent,
};
