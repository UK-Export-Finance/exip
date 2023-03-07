import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  ACCOUNT: { CREATE: { YOUR_DETAILS } },
  ALL_SECTIONS,
  DASHBOARD,
} = ROUTES;

context('Insurance - Account - Create - Your details page - Already signed in', () => {
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

  describe(`when visiting ${YOUR_DETAILS}`, () => {
    it(`should redirect to ${DASHBOARD}`, () => {
      cy.navigateToUrl(YOUR_DETAILS);

      const expectedUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;

      cy.url().should('eq', expectedUrl);
    });
  });
});
