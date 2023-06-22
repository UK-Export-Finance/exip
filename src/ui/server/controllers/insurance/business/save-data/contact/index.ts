import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';

/**
 * gets fields to add to the database and sanitises them
 * saves to businessContact table in database via api call
 * @param {Application} application
 * @param {RequestBody} formBody
 * @param {Object} errorList
 * @returns {Object} saveResponse from api
 */
const contact = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // determines which fields to save
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList));

  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  const brokerId = application.business?.businessContactDetail?.id;

  try {
    // send the form data to the API for database update.
    const saveResponse = await api.keystone.application.update.businessContact(brokerId, sanitisedData);
    return saveResponse;
  } catch (err) {
    throw new Error('Updating business contact');
  }
};

export default { contact };
