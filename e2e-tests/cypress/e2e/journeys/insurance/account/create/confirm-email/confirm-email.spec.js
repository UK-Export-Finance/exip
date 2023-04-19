import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL;

const {
  START,
  ACCOUNT: { CREATE: { YOUR_DETAILS, CONFIRM_EMAIL } },
} = ROUTES;

context('Insurance - Account - Create - Confirm email page - As an Exporter I want to create an account for UKEF digital service, So that I can readily use it for my Export Insurance Application with UKEF', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    const expected = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  let exporter;
  let expectedUrl;

  after(() => {
    cy.deleteAccount();
  });

  describe('page URL and content', () => {
    beforeEach(() => {
      /**
       * Get the exporter ID directly from the API,
       * so that we can assert that `request a new link` has the correct ID.
       */
      const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      api.getExporterByEmail(exporterEmail).then((response) => {
        const { data } = response.body;

        const [firstExporter] = data.exporters;
        exporter = firstExporter;
      });
    });

    it(`should redirect to ${CONFIRM_EMAIL} and render core page elements and content`, () => {
      expectedUrl = CONFIRM_EMAIL;

      cy.url().should('eq', `${Cypress.config('baseUrl')}${expectedUrl}`);

      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: `${CONFIRM_EMAIL}?id=${exporter.id}`,
        backLink: YOUR_DETAILS,
        assertSubmitButton: false,
        assertAuthenticatedHeader: false,
        lightHouseThresholds: {
          performance: 69,
        },
      });

      // assert confirm email content
      cy.assertConfirmEmailPageContent(exporter.id);
    });
  });
});
