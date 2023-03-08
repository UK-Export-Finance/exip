import partials from '../../../partials';
import signedOutPage from '../../../pages/insurance/account/signed-out';
import { BUTTONS, PAGES } from '../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SIGNED_OUT;

const {
  START,
  ACCOUNT: {
    SIGNED_OUT,
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = ROUTES;

context('TODO', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.navigateToUrl(SIGNED_OUT);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: SIGNED_OUT,
      assertBackLink: false,
      assertSubmitButton: false,
    });
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', START);
  });

  it('renders a `sign in` button link', () => {
    cy.checkLink(signedOutPage.signIn(), SIGN_IN_ROOT, BUTTONS.SIGN_IN);
  });

  describe('when clicking `sign in`', () => {
    it(`should redirect to ${SIGN_IN_ROOT}`, () => {
      signedOutPage.signIn().click();

      const expectedUrl = `${Cypress.config('baseUrl')}${SIGN_IN_ROOT}`;

      cy.url().should('eq', expectedUrl);
    });
  });
});
