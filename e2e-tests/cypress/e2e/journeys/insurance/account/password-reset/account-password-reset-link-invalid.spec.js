import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    PASSWORD_RESET: { NEW_PASSWORD, LINK_INVALID },
  },
} = ROUTES;

context('Insurance - Account - Password reset - new password page - Visit with an invalid token query param', () => {
  const baseUrl = Cypress.config('baseUrl');
  const newPasswordUrl = `${baseUrl}${NEW_PASSWORD}?token=invalid`;
  const linkExpiredUrl = `${baseUrl}${LINK_INVALID}`;

  before(() => {
    cy.navigateToUrl(newPasswordUrl);
  });

  it(`should redirect to ${LINK_INVALID}`, () => {
    cy.assertUrl(linkExpiredUrl);
  });
});
