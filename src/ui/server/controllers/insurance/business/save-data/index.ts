import api from '../../../../api';
import getDataToSave from '../../../../helpers/get-data-to-save';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../types';

/**
 * gets fields to add to the database and sanitises them
 * saves to exporterCompany tables in database via api call
 * @param {Application} application
 * @param {RequestBody} formBody
 * @param {Object} errorList
 * @returns {Object} saveResponse from api
 */
const companyDetails = async (application: Application, formBody: RequestBody, errorList?: object) => {
  // determines which fields to save
  const dataToSave = getDataToSave(formBody, errorList);

  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  const exporterCompanyId = application.exporterCompany?.id;
  const exporterCompanyAddressId = application.exporterCompanyAddress?.id;

  try {
    // send the form data to the API for database update.
    const saveResponse = await api.keystone.application.update.exporterCompany(exporterCompanyId, exporterCompanyAddressId, sanitisedData);
    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's companyDetails");
  }
};

export default {
  companyDetails,
};
