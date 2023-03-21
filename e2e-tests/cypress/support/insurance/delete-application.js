import api from '../api';

/**
 * deleteApplication
 * Delete an application so we have a clean state during tests
 * @param {String}: Application reference number
 */
const deleteApplication = (referenceNumber) => {
  try {
    return api.deleteApplicationByReferenceNumber(Number(referenceNumber)).then((response) => response);
  } catch (err) {
    console.error(err);

    throw new Error('Deleting application');
  }
};

export default deleteApplication;
