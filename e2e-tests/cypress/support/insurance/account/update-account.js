import api from '../../api';

/**
 * updateAccount
 * Update an account
 */
const updateAccount = (updateObj) => {
  try {
    const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT');

    // get the created exporter.
    api.getExporterByEmail(exporterEmail).then((response) => {
      const { data } = response.body;

      const [firstExporter] = data.exporters;
      const exporter = firstExporter;

      // trigger update
      api.updateExporter(exporter.id, updateObj);

      return exporter;
    });
  } catch (err) {
    console.error(err);

    throw new Error('Updating exporter account');
  }
};

export default updateAccount;
