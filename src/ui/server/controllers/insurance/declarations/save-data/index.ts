import api from '../../../../api';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import stripEmptyFormFields from '../../../../helpers/strip-empty-form-fields';
import { Application, RequestBody } from '../../../../../types';

/**
 * declarations
 * Update an application's declaration
 * This is used for any save functionality in the Declarations section of an application
 * @param {Application}
 * @param {Express.Request.body} Form data
 * @returns {Promise<Object>} Saved data
 */
const declaration = async (application: Application, formBody: RequestBody) => {
  // strip empty form fields.
  const fieldsWithValues = stripEmptyFormFields(formBody);

  const sanitisedData = sanitiseData(fieldsWithValues);

  // send the form data to the API for database update.
  const declarationId = application.declaration?.id;

  try {
    const saveResponse = await api.keystone.application.update.declarations(declarationId, sanitisedData);

    return saveResponse;
  } catch (err) {
    console.error(err);
    throw new Error("Updating application's declarations");
  }
};

export default {
  declaration,
};
