import passwordField from '../../../partials/insurance/passwordField';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import account from '../../../fixtures/account';

const {
  ACCOUNT: { PASSWORD },
} = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitNewPasswordAccountForm
 * Enter a new password a submit the form
 * @param {Object}: Arguments/values to complete the form
 */
const completeAndSubmitNewPasswordAccountForm = ({ password = account[PASSWORD] }) => {
  cy.keyboardInput(passwordField.input(), password);
  cy.clickSubmitButton();
};

export default completeAndSubmitNewPasswordAccountForm;
