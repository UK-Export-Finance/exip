import { companyDetails } from '../../../../../pages/your-business';
import { submitButton } from '../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import partials from '../../../../../partials';
import {
  ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER, INVALID_PHONE_NUMBERS, WEBSITE_EXAMPLES,
} from '../../../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      PHONE_NUMBER,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;
const errorMessage = COMPANY_DETAILS_ERRORS[PHONE_NUMBER].INCORRECT_FORMAT;

const completeAllFields = (phoneNumber) => {
  companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
  companyDetails.tradingNameYesRadioInput().click();
  companyDetails.tradingAddressYesRadioInput().click();
  companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
  companyDetails.phoneNumber().clear().type(phoneNumber);
  submitButton().click();
};

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - phone number validation - invalid phone number", () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe(`when ${PHONE_NUMBER} is incorrectly entered`, () => {
    describe('invalid long landline phone number', () => {
      it('should display validation errors', () => {
        completeAllFields(INVALID_PHONE_NUMBERS.LANDLINE.LONG);
        partials.errorSummaryListItems().should('have.length', 1);

        cy.checkText(partials.errorSummaryListItems().first(), errorMessage);
      });

      it('should focus to the phone number section when clicking the error', () => {
        partials.errorSummaryListItemLinks().first().click();
        companyDetails.phoneNumber().should('have.focus');
      });

      it('should display the validation error for phone number', () => {
        cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
      });
    });

    describe('international phone number', () => {
      it('should display validation errors', () => {
        completeAllFields(INVALID_PHONE_NUMBERS.INTERNATIONAL);

        partials.errorSummaryListItems().should('have.length', 1);

        cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

        cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
      });
    });

    describe('international phone number with full code', () => {
      it('should display validation errors', () => {
        completeAllFields(INVALID_PHONE_NUMBERS.INTERNATIONAL_PLUS);

        partials.errorSummaryListItems().should('have.length', 1);

        cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

        cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
      });
    });

    describe('mobile number with too many numbers', () => {
      it('should display validation errors', () => {
        completeAllFields(INVALID_PHONE_NUMBERS.MOBILE.LONG);

        partials.errorSummaryListItems().should('have.length', 1);
        cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

        cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
      });
    });

    describe('landline number with too few numbers', () => {
      it('should display validation errors', () => {
        completeAllFields(INVALID_PHONE_NUMBERS.LANDLINE.SHORT);

        partials.errorSummaryListItems().should('have.length', 1);
        cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

        cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
      });
    });

    describe('special characters in phone number', () => {
      it('should display validation errors', () => {
        completeAllFields(INVALID_PHONE_NUMBERS.LANDLINE.SPECIAL_CHAR);

        partials.errorSummaryListItems().should('have.length', 1);
        cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

        cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
      });
    });

    describe('letters in phone number', () => {
      it('should display validation errors', () => {
        completeAllFields(INVALID_PHONE_NUMBERS.LANDLINE.LETTER);

        partials.errorSummaryListItems().should('have.length', 1);
        cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

        cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
      });
    });

    describe('special characters in mobile number', () => {
      it('should display validation errors', () => {
        completeAllFields(INVALID_PHONE_NUMBERS.MOBILE.SPECIAL_CHAR);

        partials.errorSummaryListItems().should('have.length', 1);
        cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

        cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
      });
    });

    describe('too short a number with special chars', () => {
      it('should display validation errors', () => {
        completeAllFields(INVALID_PHONE_NUMBERS.TOO_SHORT);

        partials.errorSummaryListItems().should('have.length', 1);
        cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

        cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
      });
    });

    describe('a number above the maximum allowed characters', () => {
      it('should display validation errors', () => {
        completeAllFields(INVALID_PHONE_NUMBERS.ABOVE_MAX_CHARS);

        partials.errorSummaryListItems().should('have.length', 1);
        cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

        cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
      });
    });
  });
});
