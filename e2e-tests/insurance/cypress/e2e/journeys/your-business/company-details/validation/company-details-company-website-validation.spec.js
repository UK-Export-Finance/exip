import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import {
  ROUTES, FIELD_IDS, WEBSITE_EXAMPLES,
} from '../../../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      WEBSITE,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const expectedErrorMessage = COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT;

const field = fieldSelector(WEBSITE);

const baseUrl = Cypress.config('baseUrl');

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - company website validation", () => {
  let referenceNumber;
  let url;
  let natureOfBusinessUrl;

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

  describe(`${WEBSITE} error`, () => {
    describe('invalid website format', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeCompanyDetailsForm({});
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors({
          field,
          value: WEBSITE_EXAMPLES.INVALID,
          expectedErrorMessage,
        });
      });
    });

    describe('website above 191 characters', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeCompanyDetailsForm({});
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors({
          field,
          value: WEBSITE_EXAMPLES.ABOVE_MAX_LENGTH,
          expectedErrorMessage,
        });
      });
    });
  });

  describe(`when ${WEBSITE} is left empty`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeCompanyDetailsForm({});

      field(WEBSITE).input().clear();
      cy.clickSubmitButton();
    });

    it('should not display validation errors', () => {
      cy.assertErrorSummaryListDoesNotExist();
    });

    it(`should redirect to ${natureOfBusinessUrl}`, () => {
      cy.assertUrl(natureOfBusinessUrl);
    });
  });

  describe(`when ${WEBSITE} is correctly entered`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeCompanyDetailsForm({});

      field(WEBSITE).input().clear().type(WEBSITE_EXAMPLES.VALID);
      cy.clickSubmitButton();
    });

    it('should not display validation errors', () => {
      cy.assertErrorSummaryListDoesNotExist();
    });

    it(`should redirect to ${natureOfBusinessUrl}`, () => {
      cy.assertUrl(natureOfBusinessUrl);
    });
  });
});
