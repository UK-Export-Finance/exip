import { confirmEmailPage } from '../../../../../../../pages/insurance/account/create';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  START,
  ACCOUNT: { CREATE: { CONFIRM_EMAIL } },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Create - Confirm email page - refreshing the page', () => {
  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    const expected = `${baseUrl}${CONFIRM_EMAIL}`;

    cy.assertUrl(expected);

    cy.reload();
  });

  it('should NOT render `sent a link to` with the submitted email, because it is no longer in the session', () => {
    confirmEmailPage.weSentLinkTo().should('not.exist');
  });
});
