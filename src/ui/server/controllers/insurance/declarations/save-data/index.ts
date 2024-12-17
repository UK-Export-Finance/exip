import api from '../../../../api';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import stripEmptyFormFields from '../../../../helpers/strip-empty-form-fields';
import { Application, RequestBody } from '../../../../../types';

/**
 * declaration
 * Update an application's declaration
 * This is used for any save functionality in the Declarations section of an application
 * @param {Application} application
 * @param {Express.Request.body} formBody
 * @returns {Promise<Object>} Saved data
 */
const declaration = async (application: Application, formBody: RequestBody) => {
  // strip empty form fields.
  const fieldsWithValues = stripEmptyFormFields(formBody);

  const sanitisedData = sanitiseData(fieldsWithValues);

  // send the form data to the API for database update.
  const declarationId = application.declaration?.id;

  try {
    const saveResponse = await api.keystone.application.update.declaration(declarationId, sanitisedData);

    return saveResponse;
  } catch (error) {
    console.error("Error updating application's declaration %o", error);

    throw new Error("Updating application's declaration");
  }
};

export default {
  declaration,
};
