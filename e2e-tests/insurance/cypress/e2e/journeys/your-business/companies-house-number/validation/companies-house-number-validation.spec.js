import { field } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import {
  COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_NUMBER_EMPTY,
  COMPANIES_HOUSE_NUMBER_TOO_SHORT,
  COMPANIES_HOUSE_NUMBER_WITH_SPECIAL_CHARACTERS,
  COMPANIES_HOUSE_NUMBER_WITH_SPACE,
  COMPANIES_HOUSE_NUMBER_NOT_FOUND,
} from '../../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const { ROOT } = INSURANCE_ROUTES;

const {
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE_NUMBER: FIELD_ID,
  },
} = INSURANCE_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const COMPANY_HOUSE_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Companies house number page validation', () => {
  let referenceNumber;
  let url;
  let companyDetailsUrl;
  let companyNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      url = `${baseUrl}${ROOT}/${referenceNumber}${INSURANCE_ROUTES.EXPORTER_BUSINESS.COMPANIES_HOUSE_NUMBER}`;
      companyDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${INSURANCE_ROUTES.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
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
      cy.submitAndAssertFieldErrors(field(FIELD_ID), companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].INCORRECT_FORMAT);
    });
  });

  describe('when the companies house number is too short', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      companyNumber = COMPANIES_HOUSE_NUMBER_TOO_SHORT;

      cy.interceptCompaniesHousePost({ referenceNumber, companyNumber });
    });

    it('should display the incorrect format error', () => {
      cy.submitAndAssertFieldErrors(field(FIELD_ID), companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].INCORRECT_FORMAT);
    });
  });

  describe('when the companies house number has special characters', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      companyNumber = COMPANIES_HOUSE_NUMBER_WITH_SPECIAL_CHARACTERS;

      cy.interceptCompaniesHousePost({ referenceNumber, companyNumber });
    });

    it('should display the incorrect format error', () => {
      cy.submitAndAssertFieldErrors(field(FIELD_ID), companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].INCORRECT_FORMAT);
    });
  });

  describe('when the companies house number has a space', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      companyNumber = COMPANIES_HOUSE_NUMBER_WITH_SPACE;

      cy.interceptCompaniesHousePost({ referenceNumber, companyNumber });
    });

    it('should display the incorrect format error', () => {
      cy.submitAndAssertFieldErrors(field(FIELD_ID), companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].INCORRECT_FORMAT);
    });
  });

  describe('when the companies house number is not found', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      companyNumber = COMPANIES_HOUSE_NUMBER_NOT_FOUND;

      cy.interceptCompaniesHousePost({ referenceNumber, companyNumber });
    });

    it('should display the incorrect format error', () => {
      cy.submitAndAssertFieldErrors(field(FIELD_ID), companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].NOT_FOUND);
    });
  });

  describe('when the companies house number is valid', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber, COMPANIES_HOUSE_NUMBER });
    });

    it('should not display errors and redirect to companies details page', () => {
      partials.errorSummaryListItems().should('not.exist');
      field(FIELD_ID).errorMessage().should('not.exist');
      cy.assertUrl(companyDetailsUrl);
    });
  });
});
