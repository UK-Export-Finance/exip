import { submitButton } from '../../../e2e/pages/shared';
import accountFormFields from '../../../e2e/partials/insurance/accountFormFields';
import { INSURANCE_FIELD_IDS } from '../../../../constants/field-ids/insurance';
import account from '../../../fixtures/account';

const {
  ACCOUNT: {
    EMAIL,
    PASSWORD,
  },
} = INSURANCE_FIELD_IDS;

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

  submitButton().click();
};

export default completeAndSubmitSignInAccountForm;
