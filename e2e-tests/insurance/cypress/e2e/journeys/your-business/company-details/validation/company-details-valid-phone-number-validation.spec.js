import { field } from '../../../../../../../pages/shared';
import {
  ROUTES, FIELD_IDS, VALID_PHONE_NUMBERS, WEBSITE_EXAMPLES,
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
let natureOfBusinessUrl;

const companyDetailsFormVariables = {
  [WEBSITE]: WEBSITE_EXAMPLES.VALID,
};

const completeAllFields = (phoneNumber) => {
  companyDetailsFormVariables.phoneNumber = phoneNumber;

  cy.completeCompanyDetailsForm(companyDetailsFormVariables);

  cy.clickSubmitButton();
};

const baseUrl = Cypress.config('baseUrl');

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - phone number validation - valid phone number", () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      natureOfBusinessUrl = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT}`;

      cy.startYourBusinessSection({});

      cy.completeCompanyDetailsForm({});

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

      field(PHONE_NUMBER).input().clear();
      cy.clickSubmitButton();
    });

    it('should not display validation errors', () => {
      cy.assertLength(partials.errorSummaryListItems(), 0);
    });

    it('should redirect to next page', () => {
      cy.assertUrl(natureOfBusinessUrl);
    });
  });

  context(`when ${PHONE_NUMBER} is correctly entered`, () => {
    describe('valid landline phone number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
      });

      it('should not display validation errors', () => {
        cy.assertLength(partials.errorSummaryListItems(), 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(natureOfBusinessUrl);
      });
    });

    describe('valid landline phone number with brackets', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.BRACKETS);
      });

      it('should not display validation errors', () => {
        cy.assertLength(partials.errorSummaryListItems(), 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(natureOfBusinessUrl);
      });
    });

    describe('valid landline phone number with dashes', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.DASHES);
      });

      it('should not display validation errors', () => {
        cy.assertLength(partials.errorSummaryListItems(), 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(natureOfBusinessUrl);
      });
    });

    describe('valid landline phone number with country code without 0s', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.FULL_NO_ZEROS);
      });

      it('should not display validation errors', () => {
        cy.assertLength(partials.errorSummaryListItems(), 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(natureOfBusinessUrl);
      });
    });

    describe('valid landline phone number with country code', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.LANDLINE.FULL);
      });

      it('should not display validation errors', () => {
        cy.assertLength(partials.errorSummaryListItems(), 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(natureOfBusinessUrl);
      });
    });

    describe('valid mobile phone number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.MOBILE.NORMAL);
      });

      it('should not display validation errors', () => {
        cy.assertLength(partials.errorSummaryListItems(), 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(natureOfBusinessUrl);
      });
    });

    describe('valid mobile phone number with dashes', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.MOBILE.DASH);
      });

      it('should not display validation errors', () => {
        cy.assertLength(partials.errorSummaryListItems(), 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(natureOfBusinessUrl);
      });
    });

    describe('valid mobile phone number with full country code', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.MOBILE.FULL_CODE);
      });

      it('should not display validation errors', () => {
        cy.assertLength(partials.errorSummaryListItems(), 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(natureOfBusinessUrl);
      });
    });

    describe('valid mobile phone number with full country code with brackets', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields(VALID_PHONE_NUMBERS.MOBILE.FULL_CODE_BRACKET);
      });

      it('should not display validation errors', () => {
        cy.assertLength(partials.errorSummaryListItems(), 0);
      });

      it('should redirect to next page', () => {
        cy.assertUrl(natureOfBusinessUrl);
      });
    });
  });
});
