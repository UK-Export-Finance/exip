import api from '../../api';

const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT');

/**
 * deleteAccount
 * Get the exporter and delete.
 * This prevents account tests from failing, where an account/email must be unique and verified.
 * @param {String}: Email address
 */
const deleteAccount = (email = exporterEmail) => {
  try {
    // get the created exporter.
    api.getExporterByEmail(email).then((response) => {
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
