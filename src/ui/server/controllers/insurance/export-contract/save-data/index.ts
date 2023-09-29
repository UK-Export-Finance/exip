import api from '../../../../api';
import getDataToSave from '../../../../helpers/get-data-to-save';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../types';

/**
 * exportContract
 * Strip invalid fields from submitted form data and update the application.
 * This is used for any save functionality in the Export contract section of the application.
 * @param {Object} Application
 * @param {Express.Request.body} Form data
 * @param {Object} Field error list
 * @returns {Object} Saved data
 */
const exportContract = async (application: Application, formBody: RequestBody, errorList?: object) => {
  const dataToSave = getDataToSave(formBody, errorList);

  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  // send the form data to the API for database update.
  const exportContractId = application.exportContract?.id;

  try {
    const saveResponse = await api.keystone.application.update.exportContract(exportContractId, sanitisedData);

    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's exportContract");
  }
};

export default {
  exportContract,
};
