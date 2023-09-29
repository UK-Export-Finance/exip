import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
  ALL_SECTIONS,
  DASHBOARD,
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Sign in - Already signed in', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should redirect to ${DASHBOARD} when visiting ${SIGN_IN_ROOT}`, () => {
    cy.navigateToUrl(SIGN_IN_ROOT);

    const expectedUrl = `${baseUrl}${DASHBOARD}`;

    cy.assertUrl(expectedUrl);
  });
});
