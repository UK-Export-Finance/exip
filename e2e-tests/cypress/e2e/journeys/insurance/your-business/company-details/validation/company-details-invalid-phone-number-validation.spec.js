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
  cy.completeCompanyDetailsForm(COMPANIES_HOUSE_NUMBER, phoneNumber, WEBSITE_EXAMPLES.VALID);

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

      partials.errorSummaryListItems().should('have.length', 1);

      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for international phone number with full code', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.INTERNATIONAL_PLUS);

      partials.errorSummaryListItems().should('have.length', 1);

      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for mobile number with too many numbers', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.MOBILE.LONG);

      partials.errorSummaryListItems().should('have.length', 1);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for landline number with too few numbers', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.LANDLINE.SHORT);

      partials.errorSummaryListItems().should('have.length', 1);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for special characters in phone number', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.LANDLINE.SPECIAL_CHAR);

      partials.errorSummaryListItems().should('have.length', 1);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for letters in phone number', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.LANDLINE.LETTER);

      partials.errorSummaryListItems().should('have.length', 1);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for special characters in mobile number', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.MOBILE.SPECIAL_CHAR);

      partials.errorSummaryListItems().should('have.length', 1);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for too short a number with special chars', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.TOO_SHORT);

      partials.errorSummaryListItems().should('have.length', 1);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });

    it('should display validation errors for a number above the maximum allowed characters', () => {
      completeAllFields(INVALID_PHONE_NUMBERS.ABOVE_MAX_CHARS);

      partials.errorSummaryListItems().should('have.length', 1);
      cy.checkText(partials.errorSummaryListItems().first(), errorMessage);

      cy.checkText(companyDetails.phoneNumberError(), `Error: ${errorMessage}`);
    });
  });
});
