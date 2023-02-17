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

export default () => {
  cy.inputType(accountFormFields[EMAIL].input(), account[EMAIL]);
  cy.inputType(accountFormFields[PASSWORD].input(), account[PASSWORD]);

  submitButton().click();
};
