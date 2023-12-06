import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';

/**
 * gets fields to sent to API and sanitises them
 * saves to differentTradingAddress tables in database via api call
 * @param {Application} application
 * @param {RequestBody} formBody
 * @param {Object} errorList
 * @returns {Object} saveResponse from api
 */
const differentTradingAddress = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // determines which fields to save
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList));

  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  const differentTradingAddressId = application.company.differentTradingAddress?.id;

  try {
    // send the form data to the API for database update.
    const saveResponse = await api.keystone.application.update.differentTradingAddress(differentTradingAddressId, sanitisedData);
    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's differentTradingAddress");
  }
};

export default { differentTradingAddress };
