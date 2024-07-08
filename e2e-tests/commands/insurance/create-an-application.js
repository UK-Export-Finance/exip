import api from '../api';
import { COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE } from '../../constants/examples/companies-house-number-examples';
import { TOTAL_CONTRACT_VALUE } from '../../constants';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import mockApplication from '../../fixtures/application';

const {
  ELIGIBILITY: { TOTAL_CONTRACT_VALUE_ID },
  COMPANIES_HOUSE: { COMPANY_NUMBER, FINANCIAL_YEAR_END_DATE },
} = INSURANCE_FIELD_IDS;

const { ELIGIBILITY: mockEligibilityAnswers, COMPANY: mockCompany } = mockApplication;

/**
 * createAnApplication
 * Create an application with eligibility answers and company directly via the API
 * @param {String} Account ID for the application owner
 * @param {String} Company number/companies house number
 * @param {Boolean} totalContractValueOverThreshold if total contract value in eligibility should be over threshold
 * @returns {Object} Created application
 */
const createAnApplication = (accountId, companyNumber, totalContractValueOverThreshold = false) => {
  if (accountId) {
    try {
      /**
       * Create initial company object from mockCompany/fixtures.
       */
      const { financialYearEndDate, ...companyFields } = mockCompany;
      const company = companyFields;

      /**
       * If a company number param is provided,
       * use this in the mock company.
       */
      if (companyNumber) {
        company[COMPANY_NUMBER] = companyNumber;
      }

      /**
       * Only include a company FINANCIAL_YEAR_END_DATE,
       * If COMPANY_NUMBER is not COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE.
       */
      if (company[COMPANY_NUMBER] !== COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE) {
        company[FINANCIAL_YEAR_END_DATE] = mockCompany[FINANCIAL_YEAR_END_DATE];
      }

      /**
       * declare sectionReview.eligibility=true,
       * to mimic reviewing the the eligibility answers
       */
      const sectionReview = {
        eligibility: true,
      };

      if (totalContractValueOverThreshold) {
        mockEligibilityAnswers[TOTAL_CONTRACT_VALUE_ID] = TOTAL_CONTRACT_VALUE.MORE_THAN_250K.DB_ID;
      }

      return api.createAnApplication(accountId, mockEligibilityAnswers, company, sectionReview).then((application) => application);
    } catch (err) {
      console.error('Creating an application', err);

      return err;
    }
  }

  return null;
};

export default createAnApplication;
