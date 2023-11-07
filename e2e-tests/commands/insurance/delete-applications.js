import api from '../api';

/**
 * deleteApplications
 * Delete applications so we have a clean state during tests
 * @param {Array}: Applications
 */
const deleteApplications = (applications) => {
  try {
    const applicationIds = applications.map((application) => ({ id: application.id }));

    return api.deleteApplications(applicationIds).then((response) => response);
  } catch (err) {
    console.error(err);

    throw new Error('Deleting applications');
  }
};

export default deleteApplications;
