import { confirmEmailPage } from '../../../../../pages/insurance/account/create';
import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT;

const {
  START,
  ACCOUNT: { CREATE: { CONFIRM_EMAIL, CONFIRM_EMAIL_RESENT } },
} = ROUTES;

context('Insurance - Account - Create - Resend confirm email page - As an Exporter I want to request a new link to confirm my email address, So that I can readily use my email address to set up an account that I can use for UKEF digital service such as EXIP digital service', () => {
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

  let expectedUrl;
  let exporter;

  describe('core page elements and content', () => {
    before(() => {
      /**
       * Get the exporter ID directly from the API,
       * so that we can assert that the URL and `request a new link` has the correct ID.
       */
      const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT');

      api.getExporterByEmail(exporterEmail).then((response) => {
        const { data } = response.body;

        const [firstExporter] = data.exporters;
        exporter = firstExporter;

        expectedUrl = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL_RESENT}a`;

        cy.url().should('eq', expectedUrl);
      });
    });

    it('renders all `confirm email` page content', () => {
      cy.assertConfirmEmailPageContent(exporter.id);
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: expectedUrl,
        backLink: CONFIRM_EMAIL,
        assertSubmitButton: false,
      });
    });
  });
});
