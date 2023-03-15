import api from '../api';

/**
 * deleteApplication
 * Delete an application so we have a clean state during tests
 * @param {String}: Application reference number
 */
const deleteApplication = (referenceNumber) => {
  try {
    // get the application
    api.getApplicationByReferenceNumber(Number(referenceNumber)).then((response) => {
      const { data } = response.body;

      const [firstApplication] = data.applications;
      const application = firstApplication;

      api.deleteApplicationsById(application.id).then((id) => id);
    });
  } catch (err) {
    console.error(err);

    throw new Error('Deleting application');
  }
};

export default deleteApplication;
