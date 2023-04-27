import { submitButton } from '../../../e2e/pages/shared';
import accountFormFields from '../../../e2e/partials/insurance/accountFormFields';
import { INSURANCE_FIELD_IDS } from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import account from '../../../fixtures/account';

const {
  ACCOUNT: {
    EMAIL,
    PASSWORD,
  },
} = INSURANCE_FIELD_IDS;

const {
  ACCOUNT: {
    SIGN_IN: { ENTER_CODE },
  },
} = INSURANCE_ROUTES;

/**
 * completeAndSubmitSignInAccountForm
 * Complete and submit the "sign in" form
 * @param {String} Email address
 * @param {String} Password
 * @returns {String} Valid OTP
 */
const completeAndSubmitSignInAccountForm = (email = account[EMAIL], password = account[PASSWORD]) => {
  cy.keyboardInput(accountFormFields[EMAIL].input(), email);
  cy.keyboardInput(accountFormFields[PASSWORD].input(), password);

  console.log('COMPLETE SIGN IN form .... email ', email);
  submitButton().click();

  // assert we are on the 'enter code' page'
  const expectedUrl = `${Cypress.config('baseUrl')}${ENTER_CODE}`;
  cy.url().should('eq', expectedUrl);
};

export default completeAndSubmitSignInAccountForm;
