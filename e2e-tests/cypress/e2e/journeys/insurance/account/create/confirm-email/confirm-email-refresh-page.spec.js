import { confirmEmailPage } from '../../../../../pages/insurance/account/create';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  START,
  ACCOUNT: { CREATE: { CONFIRM_EMAIL } },
} = ROUTES;

context('Insurance - Account - Create - Confirm email page - refreshing the page', () => {
  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    const expected = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL}`;

    cy.url().should('eq', expected);

    cy.reload();
  });

  it('should NOT render `sent a link to` with the submitted email, because it is no longer in the session', () => {
    confirmEmailPage.weSentLinkTo().should('not.exist');
  });
});
