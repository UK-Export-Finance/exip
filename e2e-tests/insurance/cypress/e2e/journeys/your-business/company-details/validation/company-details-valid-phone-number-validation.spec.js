import { companyDetails } from '../../../../../../../pages/your-business';
import { submitButton } from '../../../../../../../pages/shared';
import {
  ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER, VALID_PHONE_NUMBERS, WEBSITE_EXAMPLES,
} from '../../../../../../../constants';
import partials from '../../../../../../../partials';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      PHONE_NUMBER,
      WEBSITE,
    },
  },
} = FIELD_IDS.INSURANCE;

let url;
let yourContactUrl;

const companyDetailsFormVariables = {
  [WEBSITE]: WEBSITE_EXAMPLES.VALID,
};

const { taskList } = partials.insurancePartials;
const task = taskList.prepareApplication.tasks.business;

const completeAllFields = (phoneNumber) => {
  companyDetailsFormVariables.phoneNumber = phoneNumber;

  cy.completeCompanyDetailsForm(companyDetailsFormVariables);

  submitButton().click();
};

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - phone number validation - valid phone number", () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      yourContactUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.CONTACT}`;

      task.link().click();

      cy.completeCompaniesHouseNumberForm({ companiesHouseNumber: COMPANIES_HOUSE_NUMBER });

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  context(`when ${PHONE_NUMBER} is left empty`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      companyDetailsFormVariables.phoneNumber = null;

      cy.completeCompanyDetailsForm(companyDetailsFormVariables);

      companyDetails[PHONE_NUMBER].input().clear();
      submitButton().click();
    });

    it('should not display validation errors', () => {
      partials.errorSummaryListItems().should('have.length', 0);
    });

    it('should redirect to next page', () => {
      cy.assertUrl(yourContactUrl);
    });
  });

  context(`when ${PHONE_NUMBER} is correctly entered`, () => {
    describe('valid landline phone number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
      });

      it('should not display validation errors', () => {
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(yourContactUrl);
      });
    });

    describe('valid landline phone number with brackets', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.BRACKETS);
      });

      it('should not display validation errors', () => {
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(yourContactUrl);
      });
    });

    describe('valid landline phone number with dashes', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.DASHES);
      });

      it('should not display validation errors', () => {
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(yourContactUrl);
      });
    });

    describe('valid landline phone number with country code without 0s', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.FULL_NO_ZEROS);
      });

      it('should not display validation errors', () => {
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(yourContactUrl);
      });
    });

    describe('valid landline phone number with country code', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.FULL);
      });

      it('should not display validation errors', () => {
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(yourContactUrl);
      });
    });

    describe('valid mobile phone number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.MOBILE.NORMAL);
      });

      it('should not display validation errors', () => {
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(yourContactUrl);
      });
    });

    describe('valid mobile phone number with dashes', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.MOBILE.DASH);
      });

      it('should not display validation errors', () => {
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(yourContactUrl);
      });
    });

    describe('valid mobile phone number with full country code', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.MOBILE.FULL_CODE);
      });

      it('should not display validation errors', () => {
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(yourContactUrl);
      });
    });

    describe('valid mobile phone number with full country code with brackets', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.MOBILE.FULL_CODE_BRACKET);
      });

      it('should not display validation errors', () => {
        partials.errorSummaryListItems().should('have.length', 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(yourContactUrl);
      });
    });
  });
});
