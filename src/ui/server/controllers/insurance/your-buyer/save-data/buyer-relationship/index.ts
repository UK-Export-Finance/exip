import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';
import YOUR_BUYER_FIELD_IDS from '../../../../../constants/field-ids/insurance/your-buyer';

const { CONNECTION_WITH_BUYER_DESCRIPTION, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = YOUR_BUYER_FIELD_IDS;

/**
 * string fields which are exempt from being stripped by stripEmptyFormFields
 * for example when a string field needs to be set to an empty string or null
 */
export const NULL_OR_EMPTY_STRING_FIELDS = [CONNECTION_WITH_BUYER_DESCRIPTION, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER];

/**
 * gets fields to add to the database and sanitises them
 * saves to buyerRelationship table in database via API call
 * @param {Application} application
 * @param {RequestBody} formBody
 * @param {object} errorList
 * @returns {object} saveResponse from API
 */
const buyerRelationship = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // determines which fields to save
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList), NULL_OR_EMPTY_STRING_FIELDS);

  const sanitisedData = sanitiseData(dataToSave);

  const buyerRelationshipId = application.buyer.relationship?.id;

  try {
    // send the form data to the API for database update.
    const saveResponse = await api.keystone.application.update.buyerRelationship(buyerRelationshipId, sanitisedData);
    return saveResponse;
  } catch (error) {
    throw new Error('Updating buyer relationship');
  }
};

export default {
  buyerRelationship,
};
