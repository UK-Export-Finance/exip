import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { Application, RequestBody } from '../../../../../../types';

import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';

const {
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { IBAN, BIC_SWIFT_CODE },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

/**
 * string fields which are exempt from being stripped by stripEmptyFormFields
 * for example when a string field needs to be set to an empty string or null
 */
export const NULL_OR_EMPTY_STRING_FIELDS = [IBAN, BIC_SWIFT_CODE, FINANCIAL_ADDRESS];

/**
 * lossPayeeFinancialDetailsUk
 * Strip invalid fields from submitted form data and update the application.
 * This is used for any save functionality in the Policy - Loss payee financial details international part of the application.
 * @param {Application} Application
 * @param {RequestBody} Form data
 * @param {Object} Field error list
 * @returns {Promise<Object>} Saved data
 */
const lossPayeeFinancialDetailsInternational = async (application: Application, formBody: RequestBody, errorList?: object) => {
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList), NULL_OR_EMPTY_STRING_FIELDS);
  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  // send the form data to the API for database update.
  const lossPayeeFinancialDetailsInternationalId = application.nominatedLossPayee.financialInternational?.id;

  try {
    const saveResponse = await api.keystone.application.update.updateLossPayeeFinancialDetailsInternational(
      lossPayeeFinancialDetailsInternationalId,
      sanitisedData,
    );

    return saveResponse;
  } catch (err) {
    console.error("Error updating application's loss payee financial details international %O", err);
    throw new Error("Updating application's loss payee financial details international");
  }
};

export default {
  lossPayeeFinancialDetailsInternational,
};
