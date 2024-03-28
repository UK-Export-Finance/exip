import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';

const { CREDIT_PERIOD_WITH_BUYER } = POLICY_FIELD_IDS;

/**
 * string fields which are exempt from being stripped by stripEmptyFormFields
 * for example when a string field needs to be set to an empty string or null
 */
export const NULL_OR_EMPTY_STRING_FIELDS = [CREDIT_PERIOD_WITH_BUYER];

/**
 * policy
 * Strip invalid fields from submitted form data and update the application.
 * This is used for any save functionality in the Policy section of the application.
 * @param {Application} Application
 * @param {Express.Request.body} Form data
 * @param {Object} Field error list
 * @returns {Object} Saved data
 */
const policy = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // determines which fields to save
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList), NULL_OR_EMPTY_STRING_FIELDS);

  const sanitisedData = sanitiseData(dataToSave);

  // send the form data to the API for database update.
  const policyId = application.policy?.id;

  try {
    const saveResponse = await api.keystone.application.update.policy(policyId, sanitisedData);

    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's policy");
  }
};

export default {
  policy,
};
