import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT, NEW_PASSWORD },
  },
} = ROUTES;

context('Insurance - Account - Password reset - new password page - Visit without a token query param', () => {
  const newPasswordUrl = `${Cypress.config('baseUrl')}${NEW_PASSWORD}`;
  const passwordResetUrl = `${Cypress.config('baseUrl')}${PASSWORD_RESET_ROOT}`;

  before(() => {
    cy.navigateToUrl(newPasswordUrl);
  });

  it(`should redirect to ${PASSWORD_RESET_ROOT}`, () => {
    cy.assertUrl(passwordResetUrl);
  });
});
