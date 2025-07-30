import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';

/**
 * declarationModernSlavery
 * Update an application's declaration modern slavery
 * This is used for any save functionality in the "Declarations - Modern slavery" form of an application
 * @param {Application} application
 * @param {Express.Request.body} formBody
 * @returns {Promise<object>} Saved data
 */
const declarationModernSlavery = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // determines which fields to save
  const dataToSave = getDataToSave(formBody, errorList);

  const sanitisedData = sanitiseData(dataToSave);

  // send the form data to the API for database update.
  const declarationModernSlaveryId = application.declaration.modernSlavery.id;

  try {
    const saveResponse = await api.keystone.application.update.declarationModernSlavery(declarationModernSlaveryId, sanitisedData);

    return saveResponse;
  } catch (error) {
    console.error("Error updating application's declaration modern slavery %o", error);

    throw new Error("Updating application's declaration modern slavery");
  }
};

export default {
  declarationModernSlavery,
};
