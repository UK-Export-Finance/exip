import api from '../api';

/**
 * mockApplication
 * Create a mock application
 * @param {String} Account ID for the application owner
 * @param {String} Buyer ID for the application
 * @returns {Object} Application
 */
const mockApplication = (accountId, buyerId) => ({
  referenceNumber: 123,
  owner: {
    connect: {
      id: accountId,
    },
  },
  buyer: {
    connect: {
      id: buyerId,
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
const mockApplications = (accountId, countryId, count) => {
  const mocks = new Array(count).fill(mockApplication(accountId, countryId));

  return mocks;
};

/**
 * createApplications
 * Create multiple applications directly via the API
 * 1) Get a country
 * 2) Create a buyer with country ID
 * 3) Generate mock applications with owner and buyer relationships
 * 4) Create applications
 * @param {String} Account ID for the application owner
 * @param {Number} Amount of applications to create
 * @returns {Array} Created applications
 */
const createApplications = (accountId, count) => {
  if (accountId && count) {
    try {
      return api.getACountry().then((country) =>
        api.createBuyer(country.id).then((buyer) => {
          const applicationsData = mockApplications(accountId, buyer.id, count);

          return api.createApplications(applicationsData).then((applications) => applications);
        }));
    } catch (err) {
      console.error('Creating applications', err);

      return err;
    }
  }

  return null;
};

export default createApplications;
