import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';

/**
 * policy
 * Strip invalid fields from submitted form data and update the application.
 * This is used for any save functionality in the Policy section of the application.
 * @param {Application} Application
 * @param {Express.Request.body} formBody
 * @param {object} errorList: Field error list
 * @returns {Promise<object>} Saved data
 */
const policy = async (application: Application, formBody: RequestBody, errorList?: object) => {
  const dataToSave = getDataToSave(formBody, errorList);

  const sanitisedData = sanitiseData(dataToSave);

  const policyId = application.policy?.id;

  try {
    const saveResponse = await api.keystone.application.update.policy(policyId, sanitisedData);

    return saveResponse;
  } catch (error) {
    throw new Error("Updating application's policy");
  }
};

export default {
  policy,
};
