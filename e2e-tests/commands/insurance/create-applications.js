import api from '../api';

/**
 * mockApplication
 * Create a mock application
 * @param {String} Account ID for the application owner
 * @returns {Object} Application
 */
const mockApplication = (accountId) => ({
  referenceNumber: 123,
  owner: {
    connect: {
      id: accountId,
    },
  },
});

/**
 * mockApplications
 * Create an array of mock applications
 * @param {String} Account ID for the application owner
 * @param {Number} Amount of applications to create
 * @returns {Array} Applications
 */
const mockApplications = (accountId, count) => {
  const mocks = new Array(count).fill(mockApplication(accountId));

  return mocks;
};

/**
 * createApplications
 * Create multiple applications directly via the API
 * @param {String} Account ID for the application owner
 * @param {Number} Amount of applications to create
 * @returns {Array} Created applications
 */
const createApplications = (accountId, count) => {
  if (accountId && count) {
    try {
      const data = mockApplications(accountId, count);

      return api.createApplications(data).then((applications) => applications);
    } catch (err) {
      console.error('Creating applications', err);

      return err;
    }
  }

  return null;
};

export default createApplications;
