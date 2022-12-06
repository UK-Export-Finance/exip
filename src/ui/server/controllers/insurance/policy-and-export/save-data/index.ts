import api from '../../../../api';
import getValidFields from '../../../../helpers/get-valid-fields';
import getApplication from '../../../../helpers/get-application';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import { RequestBody } from '../../../../../types';

/**
 * policyAndExport
 * Strip invalid fields from submitted form data and update the application
 * @param {Number} Application reference number
 * @param {Express.Request.body} Form data
 * @param {Express.Request.body} Field error list
 * @returns {Object} Saved data
 */
const policyAndExport = async (referenceNumber: number, formBody: RequestBody, errorList?: object) => {
  const { _csrf, ...formData } = formBody;

  try {
    let dataToSave;

    if (errorList) {
      // strip out any invalid fields.
      dataToSave = getValidFields(formData, errorList);
    } else {
      // all fields are assumed valid.
      dataToSave = formBody;
    }

    // // get the application.
    const application = await getApplication(referenceNumber);

    if (application) {
      // sanitise the form data.
      const sanitisedData = sanitiseData(dataToSave);

      // send the form data to the API for database update.
      const policyAndExportId = application.policyAndExport.id;

      try {
        const saveResponse = await api.keystone.application.update.policyAndExport(policyAndExportId, sanitisedData);

        return saveResponse;
      } catch (err) {
        throw new Error("Updating application's policyAndExport");
      }
    }

    throw new Error('Getting application');
  } catch (err) {
    console.error("Error getting and updating application's policyAndExport ", { err });

    return err;
  }
};

export default {
  policyAndExport,
};
