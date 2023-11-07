import { field, submitButton } from '../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';

const {
  ACCOUNT: { SECURITY_CODE },
} = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitEnterCodeAccountForm
 * Complete and submit the "sign in - enter code" form
 * @param {String} Valid OTP
 */
const completeAndSubmitEnterCodeAccountForm = (securityCode) => {
  cy.keyboardInput(field(SECURITY_CODE).input(), securityCode);

  submitButton().click();
};

export default completeAndSubmitEnterCodeAccountForm;
