import api from '../../../../../api';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { Application, RequestBody } from '../../../../../../types';

/**
 * declarationModernSlavery
 * Update an application's declaration modern slavery
 * This is used for any save functionality in the "Declarations - Modern slavery" form of an application
 * @param {Application} application
 * @param {Express.Request.body} formBody
 * @returns {Promise<Object>} Saved data
 */
const declarationModernSlavery = async (application: Application, formBody: RequestBody) => {
  // strip empty form fields.
  const fieldsWithValues = stripEmptyFormFields(formBody);

  const sanitisedData = sanitiseData(fieldsWithValues);

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
