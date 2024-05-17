import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';

/**
 * gets fields to sent to API and sanitises them
 * saves to companyDifferentTradingAddress tables in database via api call
 * @param {Application} application
 * @param {RequestBody} formBody
 * @param {Object} errorList
 * @returns {Promise<Object>} Saved data
 */
const companyDifferentTradingAddress = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // determines which fields to save
  const dataToSave = getDataToSave(formBody, errorList);

  const sanitisedData = sanitiseData(dataToSave);

  const differentTradingAddressId = application.company.differentTradingAddress?.id;

  try {
    // send the form data to the API for database update.
    const saveResponse = await api.keystone.application.update.companyDifferentTradingAddress(differentTradingAddressId, sanitisedData);
    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's companyDifferentTradingAddress");
  }
};

export default { companyDifferentTradingAddress };
