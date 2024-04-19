import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { Application, RequestBody } from '../../../../../../types';

import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';

const { FINANCIAL_ADDRESS } = POLICY_FIELD_IDS;

/**
 * string fields which are exempt from being stripped by stripEmptyFormFields
 * for example when a string field needs to be set to an empty string or null
 */
export const NULL_OR_EMPTY_STRING_FIELDS = [FINANCIAL_ADDRESS];

/**
 * lossPayeeFinancialDetailsUk
 * Strip invalid fields from submitted form data and update the application.
 * This is used for any save functionality in the Policy - Loss payee financial details Uk part of the application.
 * @param {Application} Application
 * @param {Express.Request.body} Form data
 * @param {Object} Field error list
 * @returns {Object} Saved data
 */
const lossPayeeFinancialDetailsUk = async (application: Application, formBody: RequestBody, errorList?: object) => {
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList), NULL_OR_EMPTY_STRING_FIELDS);

  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  // send the form data to the API for database update.
  const lossPayeeFinancialDetailsUkId = application.nominatedLossPayee.financialUk?.id;

  try {
    const saveResponse = await api.keystone.application.update.lossPayeeFinancialDetailsUk(lossPayeeFinancialDetailsUkId, sanitisedData);

    return saveResponse;
  } catch (err) {
    console.error("Error updating application's loss payee financial details uk %O", err);
    throw new Error("Updating application's loss payee financial details uk");
  }
};

export default {
  lossPayeeFinancialDetailsUk,
};
