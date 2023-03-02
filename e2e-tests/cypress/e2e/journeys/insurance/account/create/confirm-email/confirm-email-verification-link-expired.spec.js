import { PAGES } from '../../../../../../../content-strings';
import { verifyEmailLinkExpiredPage } from '../../../../../pages/insurance/account/create';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.VERIFY_EMAIL_LINK_EXPIRED;

const {
  START,
  ACCOUNT: { CREATE: { CONFIRM_EMAIL, VERIFY_EMAIL, VERIFY_EMAIL_LINK_EXPIRED } },
} = ROUTES;

context('Insurance - Account - Create - Confirm email page - expired token - As an Exporter I want to verify my email address, So that I can activate my email address and use it to create a digital service account with UKEF', () => {
  let expectedUrl;
  let exporter;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    expectedUrl = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL}`;

    cy.url().should('eq', expectedUrl);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`when a verification token has expired and exporter navigates to ${VERIFY_EMAIL} with the expired token`, () => {
    before(() => {
      /**
       * Update the exporter's verification expiry date via the API,
       * so that we can mimic missing the verification period.
       */
      const today = new Date();
      const lastMonth = new Date(today.setMonth(today.getMonth() - 1));

      const updateObj = {
        verificationExpiry: lastMonth,
      };

      cy.updateAccount(updateObj).then((response) => {
        const [firstExporter] = response.body.data.exporters;

        exporter = firstExporter;
      });
    });

    it(`should redirect to ${VERIFY_EMAIL_LINK_EXPIRED}`, () => {
      const { verificationExpiry } = exporter;

      cy.navigateToUrl(`${Cypress.config('baseUrl')}${VERIFY_EMAIL}?token=${verificationExpiry}`);

      expectedUrl = `${Cypress.config('baseUrl')}${VERIFY_EMAIL_LINK_EXPIRED}`;

      cy.url().should('eq', expectedUrl);
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: `${VERIFY_EMAIL}?token=${exporter.verificationExpiry}`,
        backLink: CONFIRM_EMAIL,
        assertSubmitButton: false,
      });
    });

    it('renders body content', () => {
      cy.checkText(verifyEmailLinkExpiredPage.body(), CONTENT_STRINGS.BODY);
    });

    it('renders a link to create an account', () => {
      cy.checkLink(verifyEmailLinkExpiredPage.createAccount(), CONTENT_STRINGS.CREATE_ACCOUNT.HREF, CONTENT_STRINGS.CREATE_ACCOUNT.TEXT);
    });
  });
});
