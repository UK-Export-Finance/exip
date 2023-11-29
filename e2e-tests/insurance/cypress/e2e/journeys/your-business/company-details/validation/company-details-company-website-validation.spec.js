import { field, submitButton } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import partials from '../../../../../../../partials';
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

const expectedErrors = 1;
const errorIndex = 0;
const errorMessage = COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT;

let natureOfBusinessUrl;
let url;

const baseUrl = Cypress.config('baseUrl');

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - company website validation", () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
      natureOfBusinessUrl = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT}`;

      cy.startYourBusinessSection();

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
        cy.submitAndAssertFieldErrors(
          field(WEBSITE),
          WEBSITE_EXAMPLES.INVALID,
          errorIndex,
          expectedErrors,
          errorMessage,
        );
      });
    });

    describe('website above 191 characters', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeCompanyDetailsForm({});
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors(
          field(WEBSITE),
          WEBSITE_EXAMPLES.ABOVE_MAX_LENGTH,
          errorIndex,
          expectedErrors,
          errorMessage,
        );
      });
    });
  });

  describe(`when ${WEBSITE} is left empty`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeCompanyDetailsForm({});

      field(WEBSITE).input().clear();
      submitButton().click();
    });

    it('should not display validation errors', () => {
      partials.errorSummaryListItems().should('have.length', 0);
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
      submitButton().click();
    });

    it('should not display validation errors', () => {
      partials.errorSummaryListItems().should('have.length', 0);
    });

    it(`should redirect to ${natureOfBusinessUrl}`, () => {
      cy.assertUrl(natureOfBusinessUrl);
    });
  });
});
