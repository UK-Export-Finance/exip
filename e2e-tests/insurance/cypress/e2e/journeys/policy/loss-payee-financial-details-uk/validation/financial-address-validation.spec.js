import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { financialAddressFieldValidation } from '../../../../../../../shared-test-assertions';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Loss Payee Financial Details UK - Financial address - Validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'lossPayeeDetails', isAppointingLossPayee: true });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  financialAddressFieldValidation({});
});
