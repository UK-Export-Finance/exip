import { field } from '../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';

const {
  ACCOUNT: { ACCESS_CODE },
} = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitEnterCodeAccountForm
 * Complete and submit the "sign in - enter code" form
 * @param {String} Valid OTP
 */
const completeAndSubmitEnterCodeAccountForm = (accessCode) => {
  cy.keyboardInput(field(ACCESS_CODE).input(), accessCode);

  cy.clickSubmitButton();
};

export default completeAndSubmitEnterCodeAccountForm;
