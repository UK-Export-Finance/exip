import { field } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      DIFFERENT_TRADING_NAME,
    },
  },
} = FIELD_IDS.INSURANCE;

const { COMPANY_DETAILS } = ROUTES.INSURANCE.EXPORTER_BUSINESS;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const baseUrl = Cypress.config('baseUrl');

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - different trading name validation", () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${COMPANY_DETAILS}`;

      cy.startYourBusinessSection();

      cy.completeCompanyDetailsForm({});

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    cy.completeAndSubmitCompanyDetails({ differentTradingName: true, completeDifferentTradingName: false });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should display validation errors if trading name question is not answered', () => {
    cy.submitAndAssertFieldErrors(
      field(DIFFERENT_TRADING_NAME),
      null,
      0,
      1,
      COMPANY_DETAILS_ERRORS[DIFFERENT_TRADING_NAME].IS_EMPTY,
    );
  });
});
