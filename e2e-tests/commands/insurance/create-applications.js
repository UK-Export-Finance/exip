import api from '../api';

/**
 * createApplications
 * Create multiple applications directly via the API
 * Calls API with number of applications to create and accountId
 * API handles application creation and data
 * @param {string} Account ID for the application owner
 * @param {number} Amount of applications to create
 * @returns {Array} Created applications
 */
const createApplications = (accountId, count) => {
  if (accountId && count) {
    try {
      return api.createApplications(accountId, count).then((applications) => applications);
    } catch (error) {
      console.error('Creating applications %o', error);
      return error;
    }
  }

  return null;
};

export default createApplications;
