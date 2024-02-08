import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';
import YOUR_BUYER_FIELD_IDS from '../../../../../constants/field-ids/insurance/your-buyer';

const { CONNECTION_WITH_BUYER_DESCRIPTION } = YOUR_BUYER_FIELD_IDS;

export const nullOrEmptyStringFields = [CONNECTION_WITH_BUYER_DESCRIPTION];

/**
 * gets fields to add to the database and sanitises them
 * saves to buyerRelationship table in database via API call
 * @param {Application} application
 * @param {RequestBody} formBody
 * @param {Object} errorList
 * @returns {Object} saveResponse from API
 */
const buyerRelationship = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // determines which fields to save
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList), nullOrEmptyStringFields);

  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  const buyerRelationshipId = application.buyer.buyerRelationship?.id;

  try {
    // send the form data to the API for database update.
    const saveResponse = await api.keystone.application.update.buyerRelationship(buyerRelationshipId, sanitisedData);
    return saveResponse;
  } catch (err) {
    throw new Error('Updating buyer relationship');
  }
};

export default {
  buyerRelationship,
};
