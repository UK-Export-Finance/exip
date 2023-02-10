import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';

const {
  START,
  ACCOUNT: { CREATE: { CONFIRM_EMAIL, VERIFY_EMAIL }, SIGN_IN },
} = ROUTES;

context('Insurance - Account - Create - I want the system to generate account verification link for my email address, So that I can confirm that my email address exist and can be used to create my UKEF digital service account.', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    const expected = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe(`when navigating to the ${VERIFY_EMAIL} URL with a valid token query parameter`, () => {
    let exporter;

    before(() => {
      const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT');

      /**
       * Get the exporter (with verification hash) directly from the API,
       * so that we can mimic "clicking email verification link" and proceed with the user flow.
       */
      api.getExporterByEmail(exporterEmail).then((response) => {
        exporter = response;
      });
    });

    it(`should validate the exporter and redirect to ${SIGN_IN.ROOT}`, () => {
      /**
       * Mimic "clicking email verification link"
       */
      cy.navigateToUrl(`${Cypress.config('baseUrl')}${VERIFY_EMAIL}?token=${exporter.verificationHash}`);

      /**
       * User should be verified and therefore redirected to the "sign in" page.
       */
      const expected = `${Cypress.config('baseUrl')}${SIGN_IN.ROOT}`;

      cy.url().should('eq', expected);
    });
  });
});
