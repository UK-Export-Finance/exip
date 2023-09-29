import api from '../api';
import mockApplication from '../../fixtures/application';

const { ELIGIBILITY: mockEligibilityAnswers } = mockApplication;

/**
 * createAnApplication
 * Create an application directly via the API
 * 1) Get a country
 * 2) Create a buyer with country ID
 * 3) Generate mock application with owner and buyer relationships
 * 4) Create applications
 * @param {String} Account ID for the application owner
 * @param {Number} Amount of applications to create
 * @returns {Array} Created applications
 */
const createAnApplication = (accountId) => {
  if (accountId) {
    try {
      return api.createAnApplication(accountId, mockEligibilityAnswers).then((application) => application);
    } catch (err) {
      console.error('Creating an application', err);

      return err;
    }
  }

  return null;
};

export default createAnApplication;
