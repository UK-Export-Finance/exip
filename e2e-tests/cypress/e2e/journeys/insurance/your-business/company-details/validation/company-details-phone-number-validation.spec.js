import { companyDetails } from '../../../../../pages/your-business';
import { submitButton, yesRadioInput } from '../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import partials from '../../../../../partials';
import {
  ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER, VALID_PHONE_NUMBER, INTERNATIONAL_PHONE_NUMBER, LONG_PHONE_NUMBER, VALID_WEBSITE,
} from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      PHONE_NUMBER,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;
const errorMessage = COMPANY_DETAILS_ERRORS[PHONE_NUMBER].INCORRECT_FORMAT;

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - phone number validation", () => {
  let referenceNumber;

  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.visit(url, {
        auth: {
          username: Cypress.config('basicAuthKey'),
          password: Cypress.config('basicAuthSecret'),
        },
      });

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe(`${PHONE_NUMBER} error`, () => {
    it('should display validation errors if phone number incorrectly entered', () => {
      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      yesRadioInput().eq(0).click();
      yesRadioInput().eq(1).click();
      companyDetails.companyWebsite().clear().type(VALID_WEBSITE);
      companyDetails.phoneNumber().clear().type(LONG_PHONE_NUMBER);
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 1);
      partials.errorSummaryListItems().first().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(errorMessage);
        });
    });

    it('should focus to the phone number section when clicking the error', () => {
      partials.errorSummaryListItemLinks().first().click();
      companyDetails.phoneNumber().should('have.focus');
    });

    it('should display the validation error for phone number', () => {
      companyDetails.phoneNumberError().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(`Error: ${errorMessage}`);
        });
    });

    it('should display validation errors if phone number is international number', () => {
      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      yesRadioInput().eq(0).click();
      yesRadioInput().eq(1).click();
      companyDetails.companyWebsite().clear().type(VALID_WEBSITE);
      companyDetails.phoneNumber().clear().type(INTERNATIONAL_PHONE_NUMBER);
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 1);
      partials.errorSummaryListItems().first().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(errorMessage);
        });
    });

    it('should display the validation error for phone number', () => {
      companyDetails.phoneNumberError().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(`Error: ${errorMessage}`);
        });
    });
  });

  describe(`when ${PHONE_NUMBER} is left empty`, () => {
    it('should not display validation errors', () => {
      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      yesRadioInput().eq(0).click();
      yesRadioInput().eq(1).click();
      companyDetails.companyWebsite().clear();
      companyDetails.phoneNumber().clear();
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 0);
    });
  });

  describe(`when ${PHONE_NUMBER} is correctly entered`, () => {
    it('should not display validation errors', () => {
      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      yesRadioInput().eq(0).click();
      yesRadioInput().eq(1).click();
      companyDetails.companyWebsite().clear().type(VALID_WEBSITE);
      companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBER);
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 0);
    });
  });
});
