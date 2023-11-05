import api from '../api';
import mockApplication from '../../fixtures/application';

const { ELIGIBILITY: mockEligibilityAnswers } = mockApplication;

/**
 * createAnApplication
 * Create an application with eligibility answers directly via the API
 * @param {String} Account ID for the application owner
 * @returns {Object} Created application
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
