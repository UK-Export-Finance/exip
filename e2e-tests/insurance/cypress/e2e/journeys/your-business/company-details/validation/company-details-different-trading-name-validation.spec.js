import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, ROUTES, MAXIMUM_CHARACTERS } from '../../../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      DIFFERENT_TRADING_NAME: FIELD_ID,
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

      cy.startYourBusinessSection({});

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

  it(`should display validation errors if ${FIELD_ID} is left empty`, () => {
    cy.submitAndAssertFieldErrors({
      field: fieldSelector(FIELD_ID),
      expectedErrorMessage: COMPANY_DETAILS_ERRORS[FIELD_ID].IS_EMPTY,
    });
  });

  describe(`when ${FIELD_ID} is over ${MAXIMUM_CHARACTERS.DECLINED_BY_PRIVATE_MARKET_DESCRIPTION} characters`, () => {
    it('should display validation errors and retain the submitted value', () => {
      const submittedValue = 'a'.repeat(MAXIMUM_CHARACTERS.COMPANY_DIFFERENT_TRADING_NAME + 1);

      cy.submitAndAssertFieldErrors({
        field: fieldSelector(FIELD_ID),
        expectedErrorMessage: COMPANY_DETAILS_ERRORS[FIELD_ID].ABOVE_MAXIMUM,
        value: submittedValue,
      });
    });
  });
});
