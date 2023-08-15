import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    PASSWORD_RESET: { NEW_PASSWORD, INVALID_LINK },
  },
} = ROUTES;

context('Insurance - Account - Password reset - new password page - Visit with an invalid token query param', () => {
  const baseUrl = Cypress.config('baseUrl');
  const newPasswordUrl = `${baseUrl}${NEW_PASSWORD}?token=invalid`;
  const linkExpiredUrl = `${baseUrl}${INVALID_LINK}`;

  before(() => {
    cy.navigateToUrl(newPasswordUrl);
  });

  it(`should redirect to ${INVALID_LINK}`, () => {
    cy.assertUrl(linkExpiredUrl);
  });
});
