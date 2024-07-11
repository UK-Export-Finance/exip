import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { Application, RequestBody } from '../../../../../../types';

const { NAME, IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK } = POLICY_FIELD_IDS.LOSS_PAYEE_DETAILS;

/**
 * string fields which are exempt from being stripped by stripEmptyFormFields
 * for example when a string field needs to be set to an empty string or null
 */
export const NULL_OR_EMPTY_STRING_FIELDS = [NAME, IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK];

/**
 * nominatedLossPayee
 * Strip invalid fields from submitted form data and update the application.
 * This is used for any save functionality in the Policy - Nominated loss payee of the application.
 * @param {Application} Application
 * @param {Express.Request.body} Form data
 * @param {Object} Field error list
 * @returns {Promise<Object>} Saved data
 */
const nominatedLossPayee = async (application: Application, formBody: RequestBody, errorList?: object) => {
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList), NULL_OR_EMPTY_STRING_FIELDS);

  const sanitisedData = sanitiseData(dataToSave);

  // send the form data to the API for database update.
  const nominatedLossPayeeId = application.nominatedLossPayee?.id;

  try {
    const saveResponse = await api.keystone.application.update.nominatedLossPayee(nominatedLossPayeeId, sanitisedData);

    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's nominated loss payee");
  }
};

export default {
  nominatedLossPayee,
};
