import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    SUSPENDED: {
      VERIFY_EMAIL,
      VERIFY_EMAIL_LINK_EXPIRED,
    },
  },
} = ROUTES;

context('Insurance - Account - Suspended - verify email - Visit with an invalid token query param', () => {
  const baseUrl = Cypress.config('baseUrl');
  const verifyEmailUrl = `${baseUrl}${VERIFY_EMAIL}`;
  const verifyEmailLinkExpiredUrl = `${baseUrl}${VERIFY_EMAIL_LINK_EXPIRED}`;

  before(() => {
    cy.navigateToUrl(`${verifyEmailUrl}?token=invalid`);
  });

  it(`should redirect to ${VERIFY_EMAIL_LINK_EXPIRED}`, () => {
    cy.url().should('eq', verifyEmailLinkExpiredUrl);
  });
});
