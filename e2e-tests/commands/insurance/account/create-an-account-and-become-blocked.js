import { INSURANCE_ROUTES as ROUTES } from '../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';

import mockAccount from '../../../fixtures/account';

const {
  ACCOUNT: {
    SUSPENDED: {
      EMAIL_SENT,
    },
  },
} = ROUTES;

const { ACCOUNT: { PASSWORD } } = INSURANCE_FIELD_IDS;

const accountSuspendedEmailSentUrl = `${Cypress.config('baseUrl')}${EMAIL_SENT}`;

const invalidPassword = `${mockAccount[PASSWORD]}-invalid`;

/**
 * createAnAccountAndBecomeBlocked
 * 1) Delete account
 * 2) Complete and submit account creation form
 * 3) Verify the account email
 * 4) Complete and submit sign in form with invalid credentials over the maximum threshold
 * 5) If startReactivationJourney param is provided: submit the "account suspended" form and check the URL
 * @param {Object} Object with flags on how to complete this flow
 * - startReactivationJourney: Should submit the "account suspended" form, to begin the reactivation journey. Defaults to false.
 */
const createAnAccountAndBecomeBlocked = ({ startReactivationJourney = false }) => {
  cy.deleteAccount();

  cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

  cy.verifyAccountEmail();

  cy.completeAndSubmitSignInAccountFormMaximumInvalidRetries({
    password: invalidPassword,
  });

  if (startReactivationJourney) {
    cy.clickSubmitButton();

    cy.assertUrl(accountSuspendedEmailSentUrl);
  }
};

export default createAnAccountAndBecomeBlocked;
