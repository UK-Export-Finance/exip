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
  const policyAndExportId = application.policyAndExport?.id;

  try {
    console.log(sanitisedData, policyAndExportId);
    // const saveResponse = await api.keystone.application.update.policyAndExport(policyAndExportId, sanitisedData);

    // return saveResponse;
  } catch (err) {
    throw new Error("Updating application's companyDetails");
  }
};

export default {
  companyDetails,
};
