import api from '../api';

/**
 * deleteApplication
 * Delete an application so we have a clean state during tests
 * @param {string}: Application reference number
 */
const deleteApplication = (referenceNumber) => {
  try {
    return api.deleteApplicationByReferenceNumber(Number(referenceNumber)).then((response) => response);
  } catch (error) {
    console.error(error);

    throw new Error('Deleting application');
  }
};

export default deleteApplication;
