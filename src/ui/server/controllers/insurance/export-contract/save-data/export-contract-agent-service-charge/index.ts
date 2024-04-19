// import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
// import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';

// const {
//   AGENT_CHARGES: {
//     METHOD,
//     PAYABLE_COUNTRY_CODE,
//     FIXED_SUM,
//     FIXED_SUM_AMOUNT,
//     PERCENTAGE,
//     CHARGE_PERCENTAGE,
//   },
// } = FIELD_IDS;

// /**
//  * string fields which are exempt from being stripped by stripEmptyFormFields
//  * for example when a string field needs to be set to an empty string or null
//  */
// export const NULL_OR_EMPTY_STRING_FIELDS = [FINANCIAL_ADDRESS];

/**
 * exportContractAgentServiceCharge
 * Strip invalid fields from submitted form data and update the application.
 * This is used for any save functionality in the "Export contract agent service charge" section of the application.
 * @param {Application}
 * @param {Express.Request.body} Form data
 * @param {Object} Field error list
 * @returns {Object} Saved data
 */
const exportContractAgentServiceCharge = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList));
  // const dataToSave = stripEmptyFormFields(getDataToSave(formBody, errorList), NULL_OR_EMPTY_STRING_FIELDS);
  const dataToSave = getDataToSave(formBody, errorList);

  const sanitisedData = sanitiseData(dataToSave);

  // send the form data to the API for database update.
  const exportContractAgentServiceChargeId = application.exportContract.agent.service.charge.id;

  try {
    const saveResponse = await api.keystone.application.update.exportContractAgentServiceCharge(exportContractAgentServiceChargeId, sanitisedData);

    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's exportContractAgentServiceCharge");
  }
};

export default {
  exportContractAgentServiceCharge,
};
