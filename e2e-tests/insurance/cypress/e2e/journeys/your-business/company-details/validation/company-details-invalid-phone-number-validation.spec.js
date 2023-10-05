import { field } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import partials from '../../../../../../../partials';
import { COMPANIES_HOUSE_NUMBER, INVALID_PHONE_NUMBERS, WEBSITE_EXAMPLES } from '../../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      PHONE_NUMBER,
      WEBSITE,
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: { COMPANY_DETAILS },
} = INSURANCE_ROUTES;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;
const errorMessage = COMPANY_DETAILS_ERRORS[PHONE_NUMBER].INCORRECT_FORMAT;

const companyDetailsFormVariables = {
  [WEBSITE]: WEBSITE_EXAMPLES.VALID,
};

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const completeAllFields = () => {
  cy.completeCompanyDetailsForm(companyDetailsFormVariables);
};

const expectedErrors = 1;
const errorIndex = 0;

const baseUrl = Cypress.config('baseUrl');

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - phone number validation - invalid phone number", () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber, companiesHouseNumber: COMPANIES_HOUSE_NUMBER });

      url = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`when ${PHONE_NUMBER} is incorrectly entered`, () => {
    describe('invalid long landline phone number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors(
          field(PHONE_NUMBER),
          INVALID_PHONE_NUMBERS.LANDLINE.LONG,
          errorIndex,
          expectedErrors,
          errorMessage,
        );
      });
    });

    describe('international phone number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors(
          field(PHONE_NUMBER),
          INVALID_PHONE_NUMBERS.INTERNATIONAL,
          errorIndex,
          expectedErrors,
          errorMessage,
        );
      });
    });

    describe('international phone number with full code', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors(
          field(PHONE_NUMBER),
          INVALID_PHONE_NUMBERS.INTERNATIONAL_PLUS,
          errorIndex,
          expectedErrors,
          errorMessage,
        );
      });
    });

    describe('mobile number with too many numbers', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors(
          field(PHONE_NUMBER),
          INVALID_PHONE_NUMBERS.MOBILE.LONG,
          errorIndex,
          expectedErrors,
          errorMessage,
        );
      });
    });

    describe('landline number with too few numbers', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors(
          field(PHONE_NUMBER),
          INVALID_PHONE_NUMBERS.LANDLINE.SHORT,
          errorIndex,
          expectedErrors,
          errorMessage,
        );
      });
    });

    describe('special characters in phone number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors(
          field(PHONE_NUMBER),
          INVALID_PHONE_NUMBERS.LANDLINE.SPECIAL_CHAR,
          errorIndex,
          expectedErrors,
          errorMessage,
        );
      });
    });

    describe('letters in phone number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors(
          field(PHONE_NUMBER),
          INVALID_PHONE_NUMBERS.LANDLINE.LETTER,
          errorIndex,
          expectedErrors,
          errorMessage,
        );
      });
    });

    describe('special characters in mobile number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors(
          field(PHONE_NUMBER),
          INVALID_PHONE_NUMBERS.MOBILE.SPECIAL_CHAR,
          errorIndex,
          expectedErrors,
          errorMessage,
        );
      });
    });

    describe('too short a number with special chars', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors(
          field(PHONE_NUMBER),
          INVALID_PHONE_NUMBERS.TOO_SHORT,
          errorIndex,
          expectedErrors,
          errorMessage,
        );
      });
    });

    describe('should display validation errors for a number above the maximum allowed characters', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors(
          field(PHONE_NUMBER),
          INVALID_PHONE_NUMBERS.ABOVE_MAX_CHARS,
          errorIndex,
          expectedErrors,
          errorMessage,
        );
      });
    });
  });
});
