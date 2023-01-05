import { companyDetails } from '../../../../../pages/your-business';
import { submitButton, yesRadioInput } from '../../../../../pages/shared';
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

const natureOfBusinessUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS}`;
let url;

const completeAllFields = (phoneNumber) => {
  companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
  yesRadioInput().eq(0).click();
  yesRadioInput().eq(1).click();
  companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
  companyDetails.phoneNumber().clear().type(phoneNumber);
  submitButton().click();
};

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
      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

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
    cy.visit(url, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  describe(`when ${PHONE_NUMBER} is left empty`, () => {
    it('should not display validation errors', () => {
      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      yesRadioInput().eq(0).click();
      yesRadioInput().eq(1).click();
      companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
      companyDetails.phoneNumber().clear();
      submitButton().click();
      cy.url().should('eq', natureOfBusinessUrl);
    });
  });

  describe(`when ${PHONE_NUMBER} is correctly entered`, () => {
    describe('valid landline phone number', () => {
      it('should not display validation errors', () => {
        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE);
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid landline phone number with brackets', () => {
      it('should not display validation errors', () => {
        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE_BRACKETS);
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid landline phone number with dashes', () => {
      it('should not display validation errors', () => {
        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE_DASHES);
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid landline phone number with country code without 0s', () => {
      it('should not display validation errors', () => {
        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE_FULL_NO_ZEROS);
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid landline phone number with country code', () => {
      it('should not display validation errors', () => {
        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE_FULL);
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid mobile phone number', () => {
      it('should not display validation errors', () => {
        completeAllFields(VALID_PHONE_NUMBERS.MOBILE);
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid mobile phone number with dashes', () => {
      it('should not display validation errors', () => {
        completeAllFields(VALID_PHONE_NUMBERS.MOBILE_DASH);
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid mobile phone number with full country code', () => {
      it('should not display validation errors', () => {
        completeAllFields(VALID_PHONE_NUMBERS.MOBILE_FULL_CODE);
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });

    describe('valid mobile phone number with full country code with brackets', () => {
      it('should not display validation errors', () => {
        completeAllFields(VALID_PHONE_NUMBERS.MOBILE_FULL_CODE_BRACKET);
        cy.url().should('eq', natureOfBusinessUrl);
      });
    });
  });
});
