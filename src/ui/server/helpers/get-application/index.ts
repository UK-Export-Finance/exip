import api from '../../api';

/**
 * getApplication
 * Get an application from the API/DB
 * @param {Number} Application reference number
 * @returns {Object} Application
 */
const getApplication = async (referenceNumber: number) => {
  try {
    const application = await api.keystone.application.get(referenceNumber);

    // check that the application exists and has core structure.
    if (!application?.id) {
      return false;
    }

    return application;
  } catch (err) {
    throw new Error(`Getting application ${err}`);
  }
};

export default getApplication;
