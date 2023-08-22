import { companiesHouseNumber } from '../../../../../../../pages/your-business';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER as COMPANIES_HOUSE_NUMBER_VALUE } from '../../../../../../../constants';

const { ROOT } = ROUTES.INSURANCE;

const {
  COMPANIES_HOUSE_NUMBER,
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const COMPANY_HOUSE_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

context('Insurance - Your business - Companies house number page validation', () => {
  let referenceNumber;
  let url;
  let companyDetailsUrl;

  const baseUrl = Cypress.config('baseUrl');

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      url = `${baseUrl}${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER}`;
      companyDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when leaving companies house registration blank', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should display the incorrect format error', () => {
      cy.submitAndAssertFieldErrors(companiesHouseNumber, null, 0, 1, COMPANY_HOUSE_ERRORS[COMPANIES_HOUSE_NUMBER].INCORRECT_FORMAT);
    });
  });

  describe('when the companies house number is too short', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should display the incorrect format error', () => {
      cy.submitAndAssertFieldErrors(companiesHouseNumber, '1234', 0, 1, COMPANY_HOUSE_ERRORS[COMPANIES_HOUSE_NUMBER].INCORRECT_FORMAT);
    });
  });

  describe('when the companies house number has special characters', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should display the incorrect format error', () => {
      cy.submitAndAssertFieldErrors(companiesHouseNumber, '123456!', 0, 1, COMPANY_HOUSE_ERRORS[COMPANIES_HOUSE_NUMBER].INCORRECT_FORMAT);
    });
  });

  describe('when the companies house number has a space', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should display the incorrect format error', () => {
      cy.submitAndAssertFieldErrors(companiesHouseNumber, '123456 ', 0, 1, COMPANY_HOUSE_ERRORS[COMPANIES_HOUSE_NUMBER].INCORRECT_FORMAT);
    });
  });

  describe('when the companies house number is not found', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should display the incorrect format error', () => {
      cy.submitAndAssertFieldErrors(companiesHouseNumber, '123456', 0, 1, COMPANY_HOUSE_ERRORS[COMPANIES_HOUSE_NUMBER].NOT_FOUND);
    });
  });

  describe('when the companies house number is correctly entered', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitCompaniesHouseSearchForm({ companiesHouseNumber: COMPANIES_HOUSE_NUMBER_VALUE });
    });

    it('should not display errors and redirect to companies details page', () => {
      partials.errorSummaryListItems().should('not.exist');
      companiesHouseNumber.errorMessage().should('not.exist');
      cy.assertUrl(companyDetailsUrl);
    });
  });
});
