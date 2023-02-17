import { submitButton } from '../../../e2e/pages/shared';
import { yourDetailsPage } from '../../../e2e/pages/insurance/account/create';
import accountFormFields from '../../../e2e/partials/insurance/accountFormFields';
import { INSURANCE_FIELD_IDS } from '../../../../constants/field-ids/insurance';
import account from '../../../fixtures/account';

const {
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    PASSWORD,
  },
} = INSURANCE_FIELD_IDS;

export default () => {
  cy.keyboardInput(yourDetailsPage[FIRST_NAME].input(), account[FIRST_NAME]);
  cy.keyboardInput(yourDetailsPage[LAST_NAME].input(), account[LAST_NAME]);
  cy.keyboardInput(accountFormFields[EMAIL].input(), account[EMAIL]);
  cy.keyboardInput(accountFormFields[PASSWORD].input(), account[PASSWORD]);

  submitButton().click();
};
