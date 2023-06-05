import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    PASSWORD_RESET: { NEW_PASSWORD, LINK_EXPIRED },
  },
} = ROUTES;

context('Insurance - Account - Password reset - new password page - Visit with an invalid token query param', () => {
  const newPasswordUrl = `${Cypress.config('baseUrl')}${NEW_PASSWORD}?token=invalid`;
  const linkExpiredUrl = `${Cypress.config('baseUrl')}${LINK_EXPIRED}`;

  before(() => {
    cy.navigateToUrl(newPasswordUrl);
  });

  it(`should redirect to ${LINK_EXPIRED}`, () => {
    cy.url().should('eq', linkExpiredUrl);
  });
});
