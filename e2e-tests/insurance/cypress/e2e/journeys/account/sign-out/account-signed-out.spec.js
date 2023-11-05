import signedOutPage from '../../../../../../pages/insurance/account/signed-out';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SIGNED_OUT;

const {
  START,
  ACCOUNT: {
    SIGNED_OUT,
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = ROUTES;

context('Insurance - Account - Signed out -  As an Exporter I want the system to securely manage my UKEF digital service sessions, So that my UKEF digital service account is securely managed and not compromised', () => {
  const url = SIGNED_OUT;

  before(() => {
    cy.navigateToUrl(START);

    cy.navigateToUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: SIGNED_OUT,
      assertBackLink: false,
      assertSubmitButton: false,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a `sign in` button link', () => {
      cy.checkLink(signedOutPage.signIn(), SIGN_IN_ROOT, BUTTONS.SIGN_IN);
    });

    it(`should redirect to ${SIGN_IN_ROOT} when clicking 'sign in'`, () => {
      signedOutPage.signIn().click();

      const expectedUrl = `${Cypress.config('baseUrl')}${SIGN_IN_ROOT}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
