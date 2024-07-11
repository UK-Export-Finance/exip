import { field } from '../../../pages/shared';
import passwordField from '../../../partials/insurance/passwordField';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import account from '../../../fixtures/account';

const {
  ACCOUNT: { EMAIL, PASSWORD },
} = INSURANCE_FIELD_IDS;

const {
  ACCOUNT: {
    SIGN_IN: { ENTER_CODE },
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * completeAndSubmitSignInAccountForm
 * Complete and submit the "sign in" form
 * @param {Object} Object with custom values to submit and flag for asserting success URL.
 * - emailAddress
 * - password
 * - assertSuccessUrl
 */
const completeAndSubmitSignInAccountForm = ({ emailAddress = account[EMAIL], password = account[PASSWORD], assertRedirectUrl = true }) => {
  cy.keyboardInput(field(EMAIL).input(), emailAddress);
  cy.keyboardInput(passwordField.input(), password);

  cy.clickSubmitButton();

  if (assertRedirectUrl) {
    // assert we are on the 'enter code' page
    const expectedUrl = `${baseUrl}${ENTER_CODE}`;

    cy.assertUrl(expectedUrl);
  }
};

export default completeAndSubmitSignInAccountForm;
