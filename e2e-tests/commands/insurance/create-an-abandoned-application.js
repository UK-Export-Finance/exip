import api from '../api';
import mockApplication from '../../fixtures/application';

const { ELIGIBILITY: mockEligibilityAnswers, COMPANY: mockCompany } = mockApplication;

/**
 * createAnAbandonedApplication
 * Create an abandoned application directly via the API
 * 1) Create company from mock company
 * 2) Create section review
 * 3) Call API to create abandoned application
 * @param {string} Account ID for the application owner
 * @returns {object} Created application
 */
const createAnAbandonedApplication = (accountId) => {
  if (accountId) {
    try {
      /**
       * Create initial company object from mockCompany/fixtures.
       */
      const { _financialYearEndDate, ...companyFields } = mockCompany;
      const company = companyFields;

      /**
       * pass sectionReview for eligibility to API
       * has to be set to true for eligibility
       */
      const sectionReview = {
        eligibility: true,
      };

      return api.createAnAbandonedApplication(accountId, mockEligibilityAnswers, company, sectionReview).then((application) => application);
    } catch (error) {
      console.error('Creating an abandoned application %o', error);

      return error;
    }
  }

  return null;
};

export default createAnAbandonedApplication;
