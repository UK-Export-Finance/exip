import api from '../../api';

/**
 * deleteAccount
 * Get the exporter and delete.
 * This prevents account tests from failing, where an account/email must be unique and verified.
 */
const deleteAccount = () => {
  try {
    const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT');

    // get the created exporter.
    api.getExporterByEmail(exporterEmail).then((response) => {
      const { data } = response.body;

      const [firstExporter] = data.exporters;
      const exporter = firstExporter;

      api.deleteExportersById(exporter.id).then((id) => id);
    });
  } catch (err) {
    console.error(err);

    throw new Error('Deleting exporter account');
  }
};

export default deleteAccount;
