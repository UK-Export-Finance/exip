import { noRadio } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';

const {
  ROOT,
  YOUR_BUYER: { FAILED_TO_PAY },
} = INSURANCE_ROUTES;

const { FAILED_PAYMENTS } = FIELD_IDS;

const {
  INSURANCE: { YOUR_BUYER: ERRORS },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Failed to pay page - Validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${FAILED_TO_PAY}`;

      cy.completeAndSubmitYourBuyerForms({ formToStopAt: 'outstandingOrOverduePayments', exporterHasTradedWithBuyer: true, outstandingPayments: true });

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
        field: noRadio(FAILED_PAYMENTS),
        expectedErrorsCount: 1,
        expectedErrorMessage: ERRORS[FAILED_PAYMENTS].IS_EMPTY,
      });
    });
  });
});
