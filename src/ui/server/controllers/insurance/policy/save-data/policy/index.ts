import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';

const { CREDIT_PERIOD_WITH_BUYER } = POLICY_FIELD_IDS;

export const nullOrEmptyStringFields = [CREDIT_PERIOD_WITH_BUYER];

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
  const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList), nullOrEmptyStringFields);

  // sanitise the form data.
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
