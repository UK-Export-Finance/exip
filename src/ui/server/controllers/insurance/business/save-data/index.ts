import api from '../../../../api';
import getDataToSave from '../../../../helpers/get-data-to-save';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import mapSubmittedData from '../map-submitted-data';
import { Application, RequestBody } from '../../../../../types';

const companyDetails = async (application: Application, formBody: RequestBody, errorList?: object) => {
  let dataToSave = mapSubmittedData(formBody);
  dataToSave = getDataToSave(dataToSave, errorList);

  // sanitise the form data.
  const sanitisedData = sanitiseData(dataToSave);

  // send the form data to the API for database update.
  const exporterCompanyId = application.exporterCompany?.id;
  const exporterCompanyAddressId = application.exporterCompanyAddress?.id;
  try {
    console.log(sanitisedData, exporterCompanyId, exporterCompanyAddressId);
    const saveResponse = await api.keystone.application.update.exporterCompany(exporterCompanyId, exporterCompanyAddressId, sanitisedData);
    console.log('respponse', saveResponse);
    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's companyDetails");
  }
};

export default {
  companyDetails,
};
