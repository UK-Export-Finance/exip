import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
  ALL_SECTIONS,
  DASHBOARD,
} = ROUTES;

context('Insurance - Account - Sign in - Already signed in', () => {
  before(() => {
    cy.completeSignInAndGoToApplication().then((referenceNumber) => {
      const expected = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`when visiting ${SIGN_IN_ROOT}`, () => {
    it(`should redirect to ${DASHBOARD}`, () => {
      cy.navigateToUrl(SIGN_IN_ROOT);

      const expectedUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;

      cy.url().should('eq', expectedUrl);
    });
  });
});
