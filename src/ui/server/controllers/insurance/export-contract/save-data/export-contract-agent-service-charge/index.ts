import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';

/**
 * exportContractAgentServiceCharge
 * Strip invalid fields from submitted form data and update the application.
 * This is used for any save functionality in the "Export contract agent service charge" section of the application.
 * @param {Application}
 * @param {Express.Request.body} Form data
 * @param {Object} Field error list
 * @returns {Object} Saved data
 */
const exportContractAgentServiceCharge = async (application: Application, formBody: RequestBody, errorList?: object) => {
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList));

  const sanitisedData = sanitiseData(dataToSave);

  // send the form data to the API for database update.
  const exportContractAgentServiceChargeId = application.exportContract.agent.service.charge.id;

  try {
    const saveResponse = await api.keystone.application.update.exportContractAgentServiceCharge(exportContractAgentServiceChargeId, sanitisedData);

    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's exportContractAgentServiceCharge");
  }
};

export default {
  exportContractAgentServiceCharge,
};