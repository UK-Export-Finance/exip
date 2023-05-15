import api from '../../../../../../api';
import { sanitiseData } from '../../../../../../helpers/sanitise-data';
import { RequestBody, Account } from '../../../../../../../types';

/**
 * account
 * Sanitise form data for user account creation and save the data.
 * @param {Express.Request.body} Form data
 * @returns {Object} Saved data
 */
const account = async (urlOrigin: string, formBody: RequestBody) => {
  // sanitise the form data.
  const sanitisedData = sanitiseData(formBody) as Account;

  try {
    const saveResponse = await api.keystone.account.create(urlOrigin, sanitisedData);

    return saveResponse;
  } catch (err) {
    throw new Error('Creating account');
  }
};

export default {
  account,
};
