import { confirmEmailPage } from '../../../../../pages/insurance/account/create';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';

const {
  START,
  ACCOUNT: { CREATE: { CONFIRM_EMAIL, CONFIRM_EMAIL_RESENT } },
} = ROUTES;

context('Insurance - Account - Create - Resend confirm email page - Go back to confirm email page via back button', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    confirmEmailPage.havingProblems.requestNew.link().click();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  after(() => {
    cy.deleteAccount();
  });

  let expectedUrl;
  let exporter;

  describe('when going back to the `confirm email` page via back link', () => {
    before(() => {
      /**
       * Get the exporter ID directly from the API,
       * so that we can assert that the URL and `request a new link` has the correct ID.
       */
      const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      api.getExporterByEmail(exporterEmail).then((response) => {
        const { data } = response.body;

        const [firstExporter] = data.exporters;
        exporter = firstExporter;

        expectedUrl = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL_RESENT}?id=${exporter.id}`;

        cy.url().should('eq', expectedUrl);

        cy.clickBackLink();
      });
    });

    it('renders the page without error', () => {
      expectedUrl = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL}?id=${exporter.id}`;

      cy.url().should('eq', expectedUrl);
    });

    it('should have account ID in the URL params', () => {
      cy.url().then((url) => {
        const splitUrl = url.split('=');
        const accountId = splitUrl[1];

        expect(accountId).to.equal(exporter.id);
      });
    });
  });
});
