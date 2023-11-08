import api from '../api';
import { COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE } from '../../constants/examples/companies-house-number-examples';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import mockApplication from '../../fixtures/application';

const {
  COMPANIES_HOUSE: { COMPANY_NUMBER, FINANCIAL_YEAR_END_DATE },
} = INSURANCE_FIELD_IDS;

const { ELIGIBILITY: mockEligibilityAnswers, COMPANY: mockCompany } = mockApplication;

/**
 * createAnApplication
 * Create an application with eligibility answers and company directly via the API
 * @param {String} Account ID for the application owner
 * @param {String} Company number/companies house number
 * @returns {Object} Created application
 */
const createAnApplication = (accountId, companyNumber) => {
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

      return api.createAnApplication(accountId, mockEligibilityAnswers, company).then((application) => application);
    } catch (err) {
      console.error('Creating an application', err);

      return err;
    }
  }

  return null;
};

export default createAnApplication;
