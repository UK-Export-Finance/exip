import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT, NEW_PASSWORD },
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Password reset - new password page - Visit without a token query param', () => {
  const newPasswordUrl = `${baseUrl}${NEW_PASSWORD}`;
  const passwordResetUrl = `${baseUrl}${PASSWORD_RESET_ROOT}`;

  before(() => {
    cy.navigateToUrl(newPasswordUrl);
  });

  it(`should redirect to ${PASSWORD_RESET_ROOT}`, () => {
    cy.assertUrl(passwordResetUrl);
  });
});
