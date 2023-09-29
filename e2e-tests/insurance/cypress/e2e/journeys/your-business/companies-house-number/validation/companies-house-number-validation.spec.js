import { companiesHouseNumber } from '../../../../../../../pages/your-business';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import {
  ROUTES,
  FIELD_IDS,
  COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_NUMBER_EMPTY,
  COMPANIES_HOUSE_NUMBER_TOO_SHORT,
  COMPANIES_HOUSE_NUMBER_WITH_SPECIAL_CHARACTERS,
  COMPANIES_HOUSE_NUMBER_WITH_SPACE,
  COMPANIES_HOUSE_NUMBER_NOT_FOUND,
} from '../../../../../../../constants';

const { ROOT } = ROUTES.INSURANCE;

const {
  COMPANIES_HOUSE_NUMBER: FIELD_ID,
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const COMPANY_HOUSE_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

context('Insurance - Your business - Companies house number page validation', () => {
  let referenceNumber;
  let url;
  let companyDetailsUrl;
  let companyNumber;

  const baseUrl = Cypress.config('baseUrl');

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
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

      companyNumber = COMPANIES_HOUSE_NUMBER_EMPTY;

      cy.interceptCompaniesHousePost({ referenceNumber, companyNumber });
    });

    it('should display the incorrect format error', () => {
      cy.submitAndAssertFieldErrors(companiesHouseNumber, companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].INCORRECT_FORMAT);
    });
  });

  describe('when the companies house number is too short', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      companyNumber = COMPANIES_HOUSE_NUMBER_TOO_SHORT;

      cy.interceptCompaniesHousePost({ referenceNumber, companyNumber });
    });

    it('should display the incorrect format error', () => {
      cy.submitAndAssertFieldErrors(companiesHouseNumber, companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].INCORRECT_FORMAT);
    });
  });

  describe('when the companies house number has special characters', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      companyNumber = COMPANIES_HOUSE_NUMBER_WITH_SPECIAL_CHARACTERS;

      cy.interceptCompaniesHousePost({ referenceNumber, companyNumber });
    });

    it('should display the incorrect format error', () => {
      cy.submitAndAssertFieldErrors(companiesHouseNumber, companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].INCORRECT_FORMAT);
    });
  });

  describe('when the companies house number has a space', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      companyNumber = COMPANIES_HOUSE_NUMBER_WITH_SPACE;

      cy.interceptCompaniesHousePost({ referenceNumber, companyNumber });
    });

    it('should display the incorrect format error', () => {
      cy.submitAndAssertFieldErrors(companiesHouseNumber, companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].INCORRECT_FORMAT);
    });
  });

  describe('when the companies house number is not found', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      companyNumber = COMPANIES_HOUSE_NUMBER_NOT_FOUND;

      cy.interceptCompaniesHousePost({ referenceNumber, companyNumber });
    });

    it('should display the incorrect format error', () => {
      cy.submitAndAssertFieldErrors(companiesHouseNumber, companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].NOT_FOUND);
    });
  });

  describe('when the companies house number is valid', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      companyNumber = COMPANIES_HOUSE_NUMBER;

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber, companyNumber });
    });

    it('should not display errors and redirect to companies details page', () => {
      partials.errorSummaryListItems().should('not.exist');
      companiesHouseNumber.errorMessage().should('not.exist');
      cy.assertUrl(companyDetailsUrl);
    });
  });
});
