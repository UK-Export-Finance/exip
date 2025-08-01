import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';

/**
 * jointlyInsuredParty
 * Strip invalid fields from submitted form data and update the application.
 * This is used for any save functionality in the Policy - Other company to insure section of the application.
 * @param {Application} Application
 * @param {Express.Request.body} formBody
 * @param {object} errorList: Field error list
 * @returns {Promise<object>} Saved data
 */
const jointlyInsuredParty = async (application: Application, formBody: RequestBody, errorList?: object) => {
  const dataToSave = getDataToSave(formBody, errorList);

  const sanitisedData = sanitiseData(dataToSave);

  // send the form data to the API for database update.
  const jointlyInsuredPartyId = application.policy.jointlyInsuredParty?.id;

  try {
    const saveResponse = await api.keystone.application.update.jointlyInsuredParty(jointlyInsuredPartyId, sanitisedData);

    return saveResponse;
  } catch (error) {
    throw new Error("Updating application's jointly insured party");
  }
};

export default {
  jointlyInsuredParty,
};
