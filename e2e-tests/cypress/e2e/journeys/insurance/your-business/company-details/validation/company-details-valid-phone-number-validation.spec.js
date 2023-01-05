import { companyDetails } from '../../../../../pages/your-business';
import { submitButton, yesRadioInput } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import {
  ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER, VALID_PHONE_NUMBERS, WEBSITE_EXAMPLES,
} from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      PHONE_NUMBER,
    },
  },
} = FIELD_IDS.INSURANCE;

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - phone number validation - valid phone number", () => {
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
    describe('valid landline phone number', () => {
      it('should not display validation errors', () => {
        companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
        yesRadioInput().eq(0).click();
        yesRadioInput().eq(1).click();
        companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
        companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.LANDLINE);
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 0);
      });
    });

    describe('valid landline phone number with brackets', () => {
      it('should not display validation errors', () => {
        companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
        yesRadioInput().eq(0).click();
        yesRadioInput().eq(1).click();
        companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
        companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.LANDLINE_BRACKETS);
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 0);
      });
    });

    describe('valid landline phone number with dashes', () => {
      it('should not display validation errors', () => {
        companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
        yesRadioInput().eq(0).click();
        yesRadioInput().eq(1).click();
        companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
        companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.LANDLINE_DASHES);
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 0);
      });
    });

    describe('valid landline phone number with country code without 0s', () => {
      it('should not display validation errors', () => {
        companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
        yesRadioInput().eq(0).click();
        yesRadioInput().eq(1).click();
        companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
        companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.LANDLINE_FULL_NO_ZEROS);
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 0);
      });
    });

    describe('valid landline phone number with country code', () => {
      it('should not display validation errors', () => {
        companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
        yesRadioInput().eq(0).click();
        yesRadioInput().eq(1).click();
        companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
        companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.LANDLINE_FULL);
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 0);
      });
    });

    describe('valid mobile phone number', () => {
      it('should not display validation errors', () => {
        companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
        yesRadioInput().eq(0).click();
        yesRadioInput().eq(1).click();
        companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
        companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.MOBILE);
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 0);
      });
    });

    describe('valid mobile phone number with dashes', () => {
      it('should not display validation errors', () => {
        companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
        yesRadioInput().eq(0).click();
        yesRadioInput().eq(1).click();
        companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
        companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.MOBILE_DASH);
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 0);
      });
    });

    describe('valid mobile phone number with full country code', () => {
      it('should not display validation errors', () => {
        Cypress.Cookies.preserveOnce('_csrf');
        Cypress.Cookies.preserveOnce('connect.sid');
        companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
        yesRadioInput().eq(0).click();
        yesRadioInput().eq(1).click();
        companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
        companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.MOBILE_FULL_CODE);
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 0);
      });
    });

    describe('valid mobile phone number with full country code with brackets', () => {
      it('should not display validation errors', () => {
        Cypress.Cookies.preserveOnce('_csrf');
        Cypress.Cookies.preserveOnce('connect.sid');
        companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
        yesRadioInput().eq(0).click();
        yesRadioInput().eq(1).click();
        companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
        companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.MOBILE_FULL_CODE_BRACKET);
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 0);
      });
    });
  });
});
