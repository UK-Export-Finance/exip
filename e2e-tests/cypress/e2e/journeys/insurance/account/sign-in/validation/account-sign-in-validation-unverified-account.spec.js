import { yourDetailsPage } from '../../../../../pages/insurance/account/create';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';

const {
  START,
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
    CREATE: { CONFIRM_EMAIL_RESENT },
  },
} = ROUTES;

context.skip('Insurance - Account - Sign in - Validation - unverified account', () => {
  let account;

  before(() => {
    cy.navigateToUrl(START);

    // create an account but do not verify the account
    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    cy.clickBackLink();

    yourDetailsPage.signInButtonLink().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${SIGN_IN_ROOT}`;
    cy.assertUrl(expectedUrl);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  describe('when valid credentials are submitted, but the account is not verifed', () => {
    beforeEach(() => {
      /**
     * Get the account ID directly from the API,
     * so that we can assert that the URL has the correct ID.
     */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      api.getAccountByEmail(accountEmail).then((response) => {
        const { data } = response.body;

        const [firstAccount] = data.accounts;
        account = firstAccount;

        cy.completeAndSubmitSignInAccountForm({ assertSuccessUrl: false });
      });
    });

    it(`should redirect to ${CONFIRM_EMAIL_RESENT} with account ID in the URL params `, () => {
      const expectedUrl = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL_RESENT}?id=${account.id}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
