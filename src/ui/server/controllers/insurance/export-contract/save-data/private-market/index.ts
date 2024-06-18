import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';

/**
 * privateMarket
 * Strip invalid fields from submitted form data and update the application.
 * This is used for any save functionality in the Private market section of the application.
 * @param {Application}
 * @param {Express.Request.body} Form data
 * @param {Object} Field error list
 * @returns {Promise<Object>} Saved data
 */
const privateMarket = async (application: Application, formBody: RequestBody, errorList?: object) => {
  const dataToSave = getDataToSave(formBody, errorList);

  const sanitisedData = sanitiseData(dataToSave);

  // send the form data to the API for database update.
  const privateMarketId = application.exportContract.privateMarket?.id;

  try {
    const saveResponse = await api.keystone.application.update.privateMarket(privateMarketId, sanitisedData);

    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's privateMarket");
  }
};

export default {
  privateMarket,
};
