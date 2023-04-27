import { submitButton } from '../../../e2e/pages/shared';
import accountFormFields from '../../../e2e/partials/insurance/accountFormFields';
import { INSURANCE_FIELD_IDS } from '../../../../constants/field-ids/insurance';
import account from '../../../fixtures/account';

const {
  ACCOUNT: { PASSWORD },
} = INSURANCE_FIELD_IDS;

const completeAndSubmitNewPasswordAccountForm = () => {
  cy.keyboardInput(accountFormFields[PASSWORD].input(), account[PASSWORD]);
  submitButton().click();
};

export default completeAndSubmitNewPasswordAccountForm;
