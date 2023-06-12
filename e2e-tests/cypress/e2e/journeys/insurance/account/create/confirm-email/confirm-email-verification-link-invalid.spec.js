import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const { ACCOUNT: { CREATE: { VERIFY_EMAIL, VERIFY_EMAIL_LINK_EXPIRED } } } = ROUTES;

context('Insurance - Account - Create - Confirm email page - invalid token - As an Exporter I want to verify my email address, So that I can activate my email address and use it to create a digital service account with UKEF', () => {
  describe(`When an account does not exist, verification token is invalid and the user navigates to ${VERIFY_EMAIL} with the invalid token`, () => {
    before(() => {
      cy.saveSession();

      const invalidVerificationHash = 'INVALID-VERIFICAITON-TOKEN';

      cy.navigateToUrl(`${Cypress.config('baseUrl')}${VERIFY_EMAIL}?token=${invalidVerificationHash}`);
    });

    it(`should redirect to ${VERIFY_EMAIL_LINK_EXPIRED}`, () => {
      const expectedUrl = `${Cypress.config('baseUrl')}${VERIFY_EMAIL_LINK_EXPIRED}?id=null`;

      cy.url().should('eq', expectedUrl);
    });
  });
});
