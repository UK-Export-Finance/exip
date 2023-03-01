import api from '../../../../api';
import getDataToSave from '../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../helpers/strip-empty-form-fields';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../types';

/**
 * gets fields to add to the database and sanitises them
 * saves to buyer table in database via api call
 * @param {Application} application
 * @param {RequestBody} formBody
 * @param {Object} errorList
 * @returns {Object} saveResponse from api
 */
const buyer = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // determines which fields to save
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList));

  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  const buyerId = application.buyer?.id;

  try {
    // send the form data to the API for database update.
    const saveResponse = await api.keystone.application.update.buyer(buyerId, sanitisedData);
    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's buyer");
  }
};

export default {
  buyer,
};
