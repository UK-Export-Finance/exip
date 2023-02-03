import api from '../../../../../../api';
import { sanitiseData } from '../../../../../../helpers/sanitise-data';
import { RequestBody, Account } from '../../../../../../../types';

/**
 * policyAndExport
 * Strip invalid fields from submitted form data and update the application.
 * This is used for any save functionality in the Policy and export section of the application.
 * @param {Object} Application
 * @param {Express.Request.body} Form data
 * @param {Express.Request.body} Field error list
 * @returns {Object} Saved data
 */
const account = async (formBody: RequestBody) => {
  // sanitise the form data.
  const sanitisedData = sanitiseData(formBody) as Account;

  try {
    const saveResponse = await api.keystone.account.create(sanitisedData);

    return saveResponse;
  } catch (err) {
    throw new Error('Creating account');
  }
};

export default {
  account,
};
