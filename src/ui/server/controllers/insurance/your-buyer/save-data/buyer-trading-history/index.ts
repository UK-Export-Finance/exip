import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';
import YOUR_BUYER_FIELD_IDS from '../../../../../constants/field-ids/insurance/your-buyer';

const { TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE } = YOUR_BUYER_FIELD_IDS;

/**
 * string fields which are exempt from being stripped by stripEmptyFormFields
 * for example when a string field needs to be set to an empty string or null
 */
export const NULL_OR_EMPTY_STRING_FIELDS = [TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE];

/**
 * gets fields to add to the database and sanitises them
 * saves to buyerTradingHistory table in database via API call
 * @param {Application} application
 * @param {RequestBody} formBody
 * @param {Object} errorList
 * @returns {Object} saveResponse from API
 */
const buyerTradingHistory = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // determines which fields to save
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList), NULL_OR_EMPTY_STRING_FIELDS);

  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  const buyerTradingHistoryId = application.buyer.buyerTradingHistory?.id;

  try {
    // send the form data to the API for database update.
    const saveResponse = await api.keystone.application.update.buyerTradingHistory(buyerTradingHistoryId, sanitisedData);
    return saveResponse;
  } catch (err) {
    throw new Error('Updating buyer trading history');
  }
};

export default {
  buyerTradingHistory,
};
