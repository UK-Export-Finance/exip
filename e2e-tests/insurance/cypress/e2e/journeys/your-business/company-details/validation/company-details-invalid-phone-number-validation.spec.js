import { companyDetails } from '../../../../../../../pages/your-business';
import { submitButton } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import partials from '../../../../../../../partials';
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

const companyDetailsFormVariables = {
  companiesHouseNumber: COMPANIES_HOUSE_NUMBER,
  website: WEBSITE_EXAMPLES.VALID,
};

const completeAllFields = (phoneNumber) => {
  companyDetailsFormVariables.phoneNumber = phoneNumber;

  cy.completeCompanyDetailsForm(companyDetailsFormVariables);

  submitButton().click();
};

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - phone number validation - invalid phone number", () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`when ${PHONE_NUMBER} is incorrectly entered`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    describe('invalid long landline phone number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(INVALID_PHONE_NUMBERS.LANDLINE.LONG);
      });

      it('should display validation errors', () => {
        cy.checkErrorSummaryListHeading();
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

    it('should display validation errors for international phone number', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.INTERNATIONAL);

      cy.checkErrorSummaryListHeading();
      partials.errorSummaryListItems().should('have.length', 1);

      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for international phone number with full code', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.INTERNATIONAL_PLUS);

      cy.checkErrorSummaryListHeading();
      partials.errorSummaryListItems().should('have.length', 1);

      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for mobile number with too many numbers', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.MOBILE.LONG);

      cy.checkErrorSummaryListHeading();
      partials.errorSummaryListItems().should('have.length', 1);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for landline number with too few numbers', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.LANDLINE.SHORT);

      cy.checkErrorSummaryListHeading();
      partials.errorSummaryListItems().should('have.length', 1);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for special characters in phone number', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.LANDLINE.SPECIAL_CHAR);

      cy.checkErrorSummaryListHeading();
      partials.errorSummaryListItems().should('have.length', 1);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for letters in phone number', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.LANDLINE.LETTER);

      cy.checkErrorSummaryListHeading();
      partials.errorSummaryListItems().should('have.length', 1);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for special characters in mobile number', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.MOBILE.SPECIAL_CHAR);

      cy.checkErrorSummaryListHeading();
      partials.errorSummaryListItems().should('have.length', 1);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for too short a number with special chars', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.TOO_SHORT);

      cy.checkErrorSummaryListHeading();
      partials.errorSummaryListItems().should('have.length', 1);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for a number above the maximum allowed characters', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.ABOVE_MAX_CHARS);

      cy.checkErrorSummaryListHeading();
      partials.errorSummaryListItems().should('have.length', 1);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });
  });
});
