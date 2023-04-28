import { linkExpiredPage } from '../../../../../pages/insurance/account/password-reset';
import { PAGES, BUTTONS } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.LINK_EXPIRED;

const {
  START,
  ACCOUNT: {
    PASSWORD_RESET: {
      NEW_PASSWORD,
      LINK_EXPIRED,
    },
  },
} = INSURANCE_ROUTES;

const {
  ACCOUNT: { PASSWORD_RESET_HASH, PASSWORD_RESET_EXPIRY },
} = INSURANCE_FIELD_IDS;

context('Insurance - Account - Password reset - link expired page', () => {
  before(() => {
    cy.navigateToUrl(START);
    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`when a password reset verfication token has expired and exporter navigates to ${NEW_PASSWORD} with the expired token`, () => {
    let updatedExporter;

    beforeEach(async () => {
      /**
       * Get the exporter so that we can use the ID
       * to update the password reset verification period.
       */
      const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      const exportersResponse = await api.getExporterByEmail(exporterEmail);

      const { data } = exportersResponse.body;

      const [firstExporter] = data.exporters;
      const exporter = firstExporter;

      /**
       * Update the exporter's password reset verification expiry date via the API,
       * so that we can mimic missing the verification period.
       */
      const now = new Date();

      const milliseconds = 300000;
      const oneMinuteAgo = new Date(now.setMilliseconds(-milliseconds)).toISOString();

      const updateObj = {
        [PASSWORD_RESET_EXPIRY]: oneMinuteAgo,
      };

      updatedExporter = await api.updateExporter(exporter.id, updateObj);
    });

    it(`should redirect to ${LINK_EXPIRED} and render core page elements and content`, () => {
      cy.navigateToUrl(`${Cypress.config('baseUrl')}${NEW_PASSWORD}?token=${updatedExporter[PASSWORD_RESET_HASH]}`);

      const expectedUrl = `${Cypress.config('baseUrl')}${LINK_EXPIRED}`;

      cy.url().should('eq', expectedUrl);

      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: LINK_EXPIRED,
        assertBackLink: false,
        assertAuthenticatedHeader: false,
        assertSubmitButton: false,
      });

      cy.checkText(linkExpiredPage.passwordNotReset(), CONTENT_STRINGS.PASSWORD_NOT_RESET);
      cy.checkText(linkExpiredPage.ifYouWouldLike(), CONTENT_STRINGS.IF_YOU_WOULD_LIKE);

      cy.checkLink(linkExpiredPage.sendNewLinkButton(), '#', BUTTONS.SEND_NEW_LINK);
    });
  });
});
