import { noRadio } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';

const {
  ROOT,
  YOUR_BUYER: { TRADING_HISTORY },
} = INSURANCE_ROUTES;

const { OUTSTANDING_PAYMENTS } = FIELD_IDS;

const {
  INSURANCE: { YOUR_BUYER: ERRORS },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Trading history page - Validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${TRADING_HISTORY}`;

      cy.completeAndSubmitYourBuyerForms({ stopSubmittingAfter: 'tradedWithBuyer', exporterHasTradedWithBuyer: true });

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting an empty form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render validation errors', () => {
      cy.submitAndAssertRadioErrors({
        field: noRadio(OUTSTANDING_PAYMENTS),
        expectedErrorsCount: 1,
        expectedErrorMessage: ERRORS[OUTSTANDING_PAYMENTS].IS_EMPTY,
      });
    });
  });
});
