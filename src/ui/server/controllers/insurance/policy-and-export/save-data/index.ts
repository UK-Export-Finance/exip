import api from '../../../../api';
import getDataToSave from '../../../../helpers/get-data-to-save';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../types';

/**
 * policyAndExport
 * Strip invalid fields from submitted form data and update the application.
 * This is used for any save functionality in the Policy and export section of the application.
 * @param {Object} Application
 * @param {Express.Request.body} Form data
 * @param {Express.Request.body} Field error list
 * @returns {Object} Saved data
 */
const policyAndExport = async (application: Application, formBody: RequestBody, errorList?: object) => {
  const dataToSave = getDataToSave(formBody, errorList);

  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  // send the form data to the API for database update.
  const policyAndExportId = application.policyAndExport?.id;

  try {
    const saveResponse = await api.keystone.application.update.policyAndExport(policyAndExportId, sanitisedData);

    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's policyAndExport");
  }
};

export default {
  policyAndExport,
};
