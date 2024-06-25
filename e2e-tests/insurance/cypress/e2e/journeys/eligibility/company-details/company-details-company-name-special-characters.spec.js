import { COMPANIES_HOUSE_NUMBER_SPECIAL_CHARACTERS_NAME } from '../../../../../../constants/examples';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import assertCompaniesHouseSummaryList from '../../../../../../commands/insurance/assert-companies-house-summary-list';

const {
  START,
  ELIGIBILITY: { COMPANY_DETAILS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Eligibility - Companies details page - Company name with special characters - I want to check if I can use online service to apply for UKEF Export Insurance Policy',
  () => {
    const url = `${baseUrl}${COMPANY_DETAILS}`;

    before(() => {
      cy.navigateToUrl(START);

      cy.completeStartForm();
      cy.completeCheckIfEligibleForm();
      cy.completeExporterLocationForm();
      cy.completeCompaniesHouseNumberForm();
      cy.completeAndSubmitCompaniesHouseSearchForm({
        companyNumber: COMPANIES_HOUSE_NUMBER_SPECIAL_CHARACTERS_NAME,
      });

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);
    });

    it('should render `company name` key and value', () => {
      assertCompaniesHouseSummaryList.name({ differentCompanyWithSpecialCharacters: true });
    });
  },
);
