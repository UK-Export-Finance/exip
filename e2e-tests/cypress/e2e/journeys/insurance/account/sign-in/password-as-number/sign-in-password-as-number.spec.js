import { yourDetailsPage } from '../../../../../pages/insurance/account/create';
import accountFormFields from '../../../../../partials/insurance/accountFormFields';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  START,
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = ROUTES;

const {
  INSURANCE: { ACCOUNT: { SIGN_IN: SIGN_IN_ERROR_MESSAGES } },
} = ERROR_MESSAGES;

const {
  ACCOUNT: { PASSWORD },
} = INSURANCE_FIELD_IDS;

const TOTAL_REQUIRED_FIELDS = 2;

context('Insurance - Account - Sign in - Password entered as only numbers', () => {
  let url;

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    // go back to the create account page
    cy.go('back');

    // navigate to sign in page
    yourDetailsPage.signInButtonLink().click();

    url = `${Cypress.config('baseUrl')}${SIGN_IN_ROOT}`;

    cy.url().should('eq', url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('When password is entered only as a number', () => {
    before(() => {
      cy.verifyAccountEmail();
    });

    it('should display the relevant validation errors and not go to problem with service', () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitSignInAccountForm({ password: 12345, assertRedirectUrl: false });

      cy.submitAndAssertFieldErrors(accountFormFields[PASSWORD], null, 1, TOTAL_REQUIRED_FIELDS, SIGN_IN_ERROR_MESSAGES[PASSWORD].INCORRECT);
    });
  });
});
