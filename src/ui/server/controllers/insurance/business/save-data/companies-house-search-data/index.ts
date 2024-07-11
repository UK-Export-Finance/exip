import api from '../../../../../api';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../../types';

/**
 * gets fields to add to the database and sanitises them
 * saves to company tables in database via api call
 * @param {Application} application
 * @param {RequestBody} formBody
 * @returns {Promise<Object>} Saved data
 */
const companyDetailsPostMigration = async (application: Application, formBody: RequestBody) => {
  const sanitisedData = sanitiseData(formBody);

  const companyId = application.company?.id;

  try {
    // send the form data to the API for database update.
    const saveResponse = await api.keystone.application.update.companyPostDataMigration(companyId, sanitisedData);
    return saveResponse;
  } catch (err) {
    throw new Error("Updating application's company (post data migration)");
  }
};

export default { companyDetailsPostMigration };
