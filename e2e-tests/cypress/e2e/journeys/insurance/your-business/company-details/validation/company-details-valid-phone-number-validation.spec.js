import { companyDetails } from '../../../../../pages/your-business';
import { submitButton } from '../../../../../pages/shared';
import {
  ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER, VALID_PHONE_NUMBERS, WEBSITE_EXAMPLES,
} from '../../../../../../../constants';
import partials from '../../../../../partials';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      PHONE_NUMBER,
    },
  },
} = FIELD_IDS.INSURANCE;

let url;
let natureOfBusinessUrl;

const completeAllFields = (phoneNumber) => {
  companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
  companyDetails.tradingNameYesRadioInput().click();
  companyDetails.tradingAddressYesRadioInput().click();
  companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
  companyDetails.phoneNumber().clear().type(phoneNumber);
  submitButton().click();
};

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - phone number validation - valid phone number", () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;
      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
      natureOfBusinessUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS}`;

      cy.navigateToUrl(url);

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
      companyDetails.tradingNameYesRadioInput().click();
      companyDetails.tradingAddressYesRadioInput().click();
      companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
      companyDetails.phoneNumber().clear();
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 0);
    });

    it('should redirect to next page', () => {
      cy.url().should('eq', natureOfBusinessUrl);
    });
  });

  describe(`when ${PHONE_NUMBER} is correctly entered`, () => {
    describe('valid landline phone number', () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid landline phone number with brackets', () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.BRACKETS);
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid landline phone number with dashes', () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.DASHES);
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid landline phone number with country code without 0s', () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.FULL_NO_ZEROS);
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid landline phone number with country code', () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.FULL);
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid mobile phone number', () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.MOBILE.NORMAL);
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid mobile phone number with dashes', () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.MOBILE.DASH);
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid mobile phone number with full country code', () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.MOBILE.FULL_CODE);
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid mobile phone number with full country code with brackets', () => {
      it('should not display validation errors', () => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.MOBILE.FULL_CODE_BRACKET);
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });
  });
});
