import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    SUSPENDED: {
      VERIFY_EMAIL,
      ROOT: SUSPENDED_ROOT,
    },
  },
} = ROUTES;
context('Insurance - Account - Suspended - verify email - Visit without a token query param', () => {
  const baseUrl = Cypress.config('baseUrl');
  const accountSuspendedUrl = `${baseUrl}${SUSPENDED_ROOT}`;

  before(() => {
    cy.navigateToUrl(VERIFY_EMAIL);
  });

  it(`should redirect to ${SUSPENDED_ROOT}`, () => {
    cy.assertUrl(accountSuspendedUrl);
  });
});
