import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import { PAGES } from '../../../../../../../content-strings';

const {
  ACCOUNT: {
    SUSPENDED: {
      VERIFY_EMAIL,
      VERIFY_EMAIL_LINK_INVALID,
    },
  },
} = ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.LINK_INVALID;

context('Insurance - Account - Suspended - Verify email - Visit with an invalid token query param', () => {
  const baseUrl = Cypress.config('baseUrl');
  const verifyEmailUrl = `${baseUrl}${VERIFY_EMAIL}`;
  const verifyEmailLinkInvalidUrl = `${baseUrl}${VERIFY_EMAIL_LINK_INVALID}`;

  before(() => {
    cy.createAnAccountAndBecomeBlocked({ startReactivationJourney: true });
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`when the user navigates to ${VERIFY_EMAIL} with an invalid token`, () => {
    it(`should redirect to ${VERIFY_EMAIL_LINK_INVALID} and render core page elements`, () => {
      cy.navigateToUrl(`${verifyEmailUrl}?token=invalid`);

      cy.assertUrl(verifyEmailLinkInvalidUrl);

      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: verifyEmailUrl,
        assertBackLink: false,
        assertAuthenticatedHeader: false,
        assertSubmitButton: false,
      });
    });
  });
});
